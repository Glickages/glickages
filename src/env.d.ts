/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SITE_NAME: string;
  // readonly PUBLIC_PHONE_DISPLAY: string;
  // readonly PUBLIC_PHONE_LINK: string;
  // readonly PUBLIC_EMAIL: string;
  // readonly PUBLIC_LINKEDIN_URL: string;
  // readonly PUBLIC_FACEBOOK_URL: string;
  // readonly PUBLIC_INSTAGRAM_URL: string;
  // readonly PUBLIC_WHATSAPP_URL: string;
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_SANITY_API_VERSION?: string;
  readonly SANITY_API_READ_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
