import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wun5kc6h',
    dataset: 'production'
  },
  studioHost: 'harshitsharma',
  deployment: {
    appId: 'g76n8nk86md2ce3jdgy9jtlk',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
