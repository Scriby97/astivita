import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'i4ht1xtp',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Studio nach `npm run deploy` unter https://astivita.sanity.studio
  studioHost: 'astivita',
  deployment: {appId: 'ggoyqipvh74mqt0wkkiu48av'},
})
