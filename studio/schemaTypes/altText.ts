import {defineField} from 'sanity'

// Alternativtext: wird blinden und sehbehinderten Menschen vom Screenreader vorgelesen
export const altText = defineField({
  name: 'alt',
  title: 'Alternativtext (Bildbeschreibung)',
  description:
    'Was ist auf dem Bild zu sehen? Wird blinden und sehbehinderten Menschen vorgelesen. Kurz und konkret, z. B. «Melinda massiert die Schulter eines Golden Retrievers».',
  type: 'string',
  validation: (r) => r.max(200),
})
