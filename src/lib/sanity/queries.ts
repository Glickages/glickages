import { defineQuery } from 'groq';

export const BLOG_POST_CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  featured,
  coverImage {
    alt,
    asset->{
      _id,
      metadata {
        lqip,
        dimensions
      }
    }
  }
`;

export const BLOG_INDEX_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {
    ${BLOG_POST_CARD_FIELDS}
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {
    "slug": slug.current
  }
`);

export const BLOG_POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${BLOG_POST_CARD_FIELDS},
    body,
    seo
  }
`);
