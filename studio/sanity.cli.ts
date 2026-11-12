import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'TODO',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Studio nach `npm run deploy` unter https://astivita.sanity.studio
  studioHost: 'astivita',
})
