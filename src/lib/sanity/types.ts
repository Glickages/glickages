export interface SanityImageAssetMetadata {
  lqip?: string;
  dimensions?: {
    width?: number;
    height?: number;
    aspectRatio?: number;
  };
}

export interface SanityImageSource {
  alt?: string;
  asset?: {
    _id: string;
    metadata?: SanityImageAssetMetadata;
  };
}

export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  featured: boolean;
  coverImage?: SanityImageSource;
}

export interface BlogPost extends BlogPostListItem {
  body: unknown[];
  seo?: {
    title?: string;
    description?: string;
  };
}
