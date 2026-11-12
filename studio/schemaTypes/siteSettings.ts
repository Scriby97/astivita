import {defineArrayMember, defineField, defineType} from 'sanity'
import {altText} from './altText'

// Alle Inhalte der Website in einem Dokument, ein Reiter pro Seite. Felder heissen gleich wie in
// web/src/lib/sanity.ts (Typ SiteSettings) – bei Änderungen beide Seiten anpassen.
const image = (name: string, title: string, description: string, group: string) =>
  defineField({name, title, description, group, type: 'image', options: {hotspot: true}, fields: [altText]})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website',
  type: 'document',
  groups: [
    {name: 'start', title: 'Startseite', default: true},
    {name: 'angebot', title: 'Angebot'},
    {name: 'ueberMich', title: 'Über mich'},
    {name: 'kontakt', title: 'Kontakt & Rechtliches'},
    {name: 'wartung', title: 'Wartung'},
  ],
  fields: [
    // Startseite
    defineField({name: 'heroEyebrow', title: 'Kleine Zeile über dem Titel', type: 'string', group: 'start'}),
    defineField({name: 'heroTitle', title: 'Titel', type: 'string', group: 'start', validation: (r) => r.required()}),
    defineField({
      name: 'heroText',
      title: 'Text unter dem Titel',
      description: 'Erscheint auch bei Google unter dem Seitentitel – am besten ein bis zwei Sätze.',
      type: 'text',
      rows: 2,
      group: 'start',
    }),
    image('heroImage', 'Bild oben', 'Hochformat wirkt am besten. Mit «Bildausschnitt» festlegen, was wichtig ist.', 'start'),
    defineField({name: 'introText', title: 'Einleitung', type: 'richText', group: 'start'}),
    defineField({name: 'indicationsTitle', title: 'Titel «Wann sinnvoll?»', type: 'string', group: 'start'}),
    defineField({name: 'indicationsIntro', title: 'Satz darunter', type: 'text', rows: 2, group: 'start'}),
    defineField({
      name: 'indications',
      title: 'Wann ist Hundetherapie sinnvoll? (Liste)',
      description: 'Erscheint auf der Startseite und beim Angebot.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'start',
    }),

    // Angebot
    defineField({name: 'methodsTitle', title: 'Titel', type: 'string', group: 'angebot'}),
    defineField({name: 'methodsIntro', title: 'Einleitung', type: 'text', rows: 3, group: 'angebot'}),
    defineField({
      name: 'methods',
      title: 'Behandlungsmethoden',
      description: 'Reihenfolge per Ziehen ändern. Das Bild ist freiwillig und erscheint nur auf der Seite «Angebot».',
      type: 'array',
      group: 'angebot',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'text', title: 'Kurzer Text', type: 'text', rows: 3}),
            defineField({name: 'image', title: 'Bild (freiwillig)', type: 'image', options: {hotspot: true}, fields: [altText]}),
          ],
          preview: {select: {title: 'name', subtitle: 'text', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'offerText',
      title: 'Weiterer Text (freiwillig)',
      description: 'Zum Beispiel Preise, Dauer einer Behandlung oder Hausbesuche. Erscheint unter den Methoden.',
      type: 'richText',
      group: 'angebot',
    }),

    // Über mich
    defineField({name: 'aboutTitle', title: 'Titel', type: 'string', group: 'ueberMich'}),
    defineField({name: 'aboutText', title: 'Text', type: 'richText', group: 'ueberMich'}),
    image('aboutImage', 'Foto', 'Am besten Melinda mit einem Hund, im Hochformat.', 'ueberMich'),
    defineField({
      name: 'goal',
      title: 'Leitsatz',
      description: 'Steht gross im blauen Band unten auf jeder Seite.',
      type: 'text',
      rows: 2,
      group: 'ueberMich',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Hinweis zur tierärztlichen Betreuung',
      type: 'text',
      rows: 2,
      group: 'ueberMich',
    }),

    // Kontakt & Rechtliches
    defineField({name: 'siteName', title: 'Name der Praxis', type: 'string', group: 'kontakt'}),
    defineField({name: 'ownerName', title: 'Inhaberin (Vor- und Nachname)', type: 'string', group: 'kontakt'}),
    defineField({name: 'company', title: 'Firmenname laut Handelsregister (falls eingetragen)', type: 'string', group: 'kontakt'}),
    defineField({
      name: 'address',
      title: 'Adresse der Praxis',
      description: 'Strasse und Nummer, PLZ und Ort – je auf einer Zeile. Muss fürs Impressum vollständig sein.',
      type: 'text',
      rows: 3,
      group: 'kontakt',
    }),
    defineField({name: 'email', title: 'E-Mail', type: 'string', group: 'kontakt'}),
    defineField({name: 'phone', title: 'Telefon (freiwillig)', type: 'string', group: 'kontakt'}),
    defineField({name: 'instagram', title: 'Instagram-Link (freiwillig)', type: 'url', group: 'kontakt'}),
    defineField({name: 'facebook', title: 'Facebook-Link (freiwillig)', type: 'url', group: 'kontakt'}),
    defineField({name: 'contactTitle', title: 'Titel der Kontaktseite', type: 'string', group: 'kontakt'}),
    defineField({name: 'contactText', title: 'Text der Kontaktseite', type: 'text', rows: 3, group: 'kontakt'}),
    defineField({
      name: 'requestTypes',
      title: 'Auswahl «Worum geht es?» im Formular',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'kontakt',
    }),
    image('shareImage', 'Bild beim Teilen', 'Erscheint, wenn jemand die Website per WhatsApp, Facebook usw. teilt. Ohne Bild: das Logo.', 'kontakt'),
    defineField({
      name: 'privacyText',
      title: 'Datenschutzerklärung',
      description: 'Leer lassen = Standardtext der Website. Die verantwortliche Person steht automatisch darüber.',
      type: 'richText',
      group: 'kontakt',
    }),

    // Wartung
    defineField({
      name: 'maintenance',
      title: 'Wartungsmodus',
      description: 'Eingeschaltet sehen Besucher nur einen Hinweis. Mit dem Passwort kommt man trotzdem auf die Website.',
      type: 'boolean',
      initialValue: false,
      group: 'wartung',
    }),
    defineField({name: 'maintenanceText', title: 'Hinweistext', type: 'text', rows: 2, group: 'wartung'}),
    defineField({name: 'previewPassword', title: 'Passwort für die Vorschau', type: 'string', group: 'wartung'}),
  ],
  preview: {prepare: () => ({title: 'Website'})},
})
