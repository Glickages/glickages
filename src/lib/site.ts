export const siteConfig = {
  siteUrl: 'https://glickages.com',
  siteName: 'Glickages',
  email: 'hello@glickages.com',
  phoneDisplay: '+234 705 905 5888',
  phoneLink: '+2347059055888',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/glickages',
    X: 'https://x.com/glickages',
    facebook: 'https://www.facebook.com/glickages',
    instagram: 'https://www.instagram.com/glickages',
    whatsapp: 'https://wa.me/2347059055888',
  },
} as const;

export const contactLinks = {
  email: `mailto:${siteConfig.email}`,
  phone: `tel:${siteConfig.phoneLink}`,
} as const;
