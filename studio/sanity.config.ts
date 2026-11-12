import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

// Sanity-Projekt «Astivita» – Project-ID nach dem Anlegen hier und in sanity.cli.ts eintragen
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'TODO'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Es gibt genau ein Dokument «Website» – kein "Neu erstellen"/"Löschen" dafür
const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Astivita Hundetherapie',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalte')
          .items([S.listItem().title('Website').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings'))]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
