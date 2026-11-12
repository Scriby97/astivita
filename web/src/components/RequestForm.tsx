"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { inputClass, sendForm, web3formsKey } from "@/lib/web3forms";

type Status = "idle" | "sending" | "success" | "error";

const optional = <span className="font-normal text-muted">(optional)</span>;

// Terminanfrage: geht per E-Mail an Melinda (Web3Forms), sie meldet sich mit einem Terminvorschlag
export function RequestForm({ requestTypes }: { requestTypes: string[] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    try {
      await sendForm({
        subject: `Terminanfrage: ${form.get("dog")} (${form.get("type")}) von ${form.get("name")}`,
        botcheck: form.get("botcheck"),
        Name: form.get("name"),
        email: form.get("email"),
        Telefon: form.get("phone") || "–",
        Anliegen: form.get("type"),
        Hund: form.get("dog"),
        "Rasse und Alter": form.get("breed") || "–",
        Wunschtermine: form.get("dates") || "–",
        Nachricht: form.get("message"),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div id="anfrage" className="flex flex-col gap-2 rounded-3xl bg-white p-8 shadow-sm" role="status">
        <h2 className="font-display text-4xl font-semibold text-navy">Danke für deine Anfrage!</h2>
        <p className="text-muted">Ich melde mich so bald wie möglich bei dir, um einen Termin zu vereinbaren.</p>
      </div>
    );
  }

  return (
    <form id="anfrage" onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-3xl font-semibold text-navy">Anfrage</h2>
      {!web3formsKey && (
        <p className="rounded-xl bg-yellow-100 p-3 text-sm text-yellow-900">NEXT_PUBLIC_WEB3FORMS_KEY fehlt – das Formular kann noch nicht versendet werden.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Dein Name
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          E-Mail
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>Telefon {optional}</span>
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Worum geht es?
          <select name="type" className={inputClass} defaultValue={requestTypes[0]}>
            {requestTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Name deines Hundes
          <input name="dog" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>Rasse und Alter {optional}</span>
          <input name="breed" placeholder="z. B. Labrador, 9 Jahre" className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Was beschäftigt deinen Hund?
        <textarea
          name="message"
          required
          rows={5}
          placeholder="z. B. Operation am Knie im Oktober, seither entlastet er das rechte Hinterbein"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        <span>Wann passt es dir? {optional}</span>
        <input name="dates" placeholder="z. B. Dienstag- oder Donnerstagnachmittag" className={inputClass} />
      </label>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <p className="text-sm text-muted">
        Deine Angaben verwende ich nur für deine Anfrage, siehe{" "}
        <Link href="/datenschutz" className="text-navy underline decoration-navy/30 underline-offset-2 hover:decoration-navy">
          Datenschutz
        </Link>
        .
      </p>

      {status === "error" && (
        <p className="text-sm font-semibold text-red-800">
          Die Anfrage konnte nicht gesendet werden. Bitte versuche es nochmals oder schreib mir direkt eine E-Mail.
        </p>
      )}
      <button type="submit" disabled={status === "sending" || !web3formsKey} className="btn-primary self-start disabled:opacity-50">
        {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
      </button>
    </form>
  );
}
