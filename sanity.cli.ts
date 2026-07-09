import { defineCliConfig } from 'sanity/cli';

const env = (
  globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env ?? {};

export default defineCliConfig({
  api: {
    projectId: env.PUBLIC_SANITY_PROJECT_ID ?? 'missing-project-id',
    dataset: env.PUBLIC_SANITY_DATASET ?? 'production',
  },
});
