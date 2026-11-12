import { defineConfig, devices } from "@playwright/test";

// Automatische Tests: `npm run test:e2e`
// Baut die Seite mit den festen Testdaten aus src/lib/e2e-fixtures.ts (nicht mit den Inhalten aus Sanity).
// Web3Forms und Bilder vom Sanity-CDN werden in den Tests abgefangen.
const port = 4323;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${port}`, trace: "retain-on-failure" },
  projects: [
    // Lokal das vorinstallierte Edge, in GitHub Actions das von Playwright installierte Chromium
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: process.env.CI ? undefined : "msedge" } },
    { name: "handy", use: { ...devices["Pixel 7"], channel: process.env.CI ? undefined : "msedge" } },
  ],
  webServer: {
    command: `npm run build && npx serve out -l ${port} --no-port-switching`,
    url: `http://localhost:${port}`,
    timeout: 240_000,
    reuseExistingServer: false,
    env: { E2E: "1", NEXT_PUBLIC_WEB3FORMS_KEY: "e2e-test-key" },
  },
});
