export const sanityConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? '',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2026-03-01',
} as const;

export const isSanityConfigured =
  sanityConfig.projectId.length > 0 && sanityConfig.dataset.length > 0;
