import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// 1×1-PNG für Bilder vom (Fantasie-)Sanity-CDN der Testdaten
const pixel = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");

/** Fängt alles ab, was nach aussen geht; liefert die Formulare, die an Melinda gegangen wären */
async function mockServices(page: Page, { formsFail = false } = {}) {
  const forms: Record<string, string>[] = [];
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
  await page.route("https://api.web3forms.com/**", async (route) => {
    forms.push(JSON.parse(route.request().postData()!));
    await route.fulfill({ json: formsFail ? { success: false, message: "Testfehler" } : { success: true } });
  });
  await page.route("https://cdn.sanity.io/**", (route) => route.fulfill({ body: pixel, contentType: "image/png" }));
  return forms;
}

// Barrierefreiheit (WCAG 2.1 AA) aller Seiten
for (const path of ["/", "/angebot", "/ueber-mich", "/kontakt", "/impressum", "/datenschutz", "/gibt-es-nicht"]) {
  test(`Barrierefreiheit ${path}`, async ({ page }) => {
    await mockServices(page);
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}

test("Menü führt zu allen Seiten", async ({ page, isMobile }) => {
  await mockServices(page);
  await page.goto("/");
  for (const [label, heading] of [
    ["Angebot", "Ganzheitliche Therapie für deinen Hund"],
    ["Über mich", "Fachwissen trifft auf Einfühlungsvermögen"],
    ["Kontakt", "Termin anfragen"],
  ]) {
    if (isMobile) {
      await page.getByRole("button", { name: "Menü öffnen" }).click();
      await page.getByRole("navigation", { name: "Menü" }).getByRole("link", { name: label }).click();
    } else {
      await page.getByRole("navigation", { name: "Hauptmenü" }).getByRole("link", { name: label }).click();
    }
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }
});

test("Startseite zeigt Texte, Methoden und Bilder aus dem Studio", async ({ page }) => {
  await mockServices(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hundetherapie – für mehr Bewegungsfreude und Lebensqualität");
  await expect(page.getByText("Bei orthopädischen und neurologischen Beschwerden")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Testmassage" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Hund bei der Massage" })).toBeVisible();
  await expect(page.getByText("ersetzt keine tierärztliche Diagnose").first()).toBeVisible();
});

test("Knopf «Termin anfragen» führt zum Formular", async ({ page }) => {
  await mockServices(page);
  await page.goto("/angebot");
  await page.getByRole("main").getByRole("link", { name: "Termin anfragen" }).click();
  await expect(page).toHaveURL(/\/kontakt#anfrage$/);
  await expect(page.getByRole("heading", { name: "Anfrage", exact: true })).toBeVisible();
});

test("Terminanfrage geht mit Hund und Anliegen an Melinda", async ({ page }) => {
  const forms = await mockServices(page);
  await page.goto("/kontakt");
  await page.getByLabel("Dein Name").fill("Test Halterin");
  await page.getByLabel("E-Mail").fill("halterin@example.ch");
  await page.getByLabel("Worum geht es?").selectOption("Folgetermin");
  await page.getByLabel("Name deines Hundes").fill("Bello");
  await page.getByLabel(/Rasse und Alter/).fill("Labrador, 9 Jahre");
  await page.getByLabel("Was beschäftigt deinen Hund?").fill("Lahmt hinten rechts.");
  await page.getByLabel(/Wann passt es dir/).fill("Dienstagnachmittag");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.getByRole("heading", { name: "Danke für deine Anfrage!" })).toBeVisible();
  expect(forms[0]).toMatchObject({
    subject: "Terminanfrage: Bello (Folgetermin) von Test Halterin",
    email: "halterin@example.ch",
    Hund: "Bello",
    "Rasse und Alter": "Labrador, 9 Jahre",
    Wunschtermine: "Dienstagnachmittag",
    Nachricht: "Lahmt hinten rechts.",
  });
});

test("Fehler beim Senden: Hinweis, Eingaben bleiben stehen", async ({ page }) => {
  await mockServices(page, { formsFail: true });
  await page.goto("/kontakt");
  await page.getByLabel("Dein Name").fill("Test");
  await page.getByLabel("E-Mail").fill("test@example.ch");
  await page.getByLabel("Name deines Hundes").fill("Luna");
  await page.getByLabel("Was beschäftigt deinen Hund?").fill("Verspannt.");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.getByText("Die Anfrage konnte nicht gesendet werden.")).toBeVisible();
  await expect(page.getByLabel("Name deines Hundes")).toHaveValue("Luna");
});

test("Impressum und Datenschutz mit Kontaktangaben aus dem Studio", async ({ page }) => {
  await mockServices(page);
  await page.goto("/impressum");
  await expect(page.getByText("Inhaberin: Test Therapeutin")).toBeVisible();
  await expect(page.getByRole("main").getByText("5607 Uezwil")).toBeVisible();
  await page.goto("/datenschutz");
  await expect(page.getByRole("heading", { name: "Terminanfrage und Kontakt" })).toBeVisible();
});
