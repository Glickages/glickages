import { sanityClient } from 'sanity:client';

import { isSanityConfigured } from './config';
import { BLOG_INDEX_QUERY, BLOG_POST_QUERY, BLOG_SLUGS_QUERY } from './queries';
import type { BlogPost, BlogPostListItem } from './types';

export async function getBlogIndexPosts(): Promise<BlogPostListItem[]> {
  if (!isSanityConfigured) {
    return [];
  }

  return sanityClient.fetch<BlogPostListItem[]>(BLOG_INDEX_QUERY);
}

export async function getBlogPostSlugs(): Promise<Array<{ slug: string }>> {
  if (!isSanityConfigured) {
    return [];
  }

  return sanityClient.fetch<Array<{ slug: string }>>(BLOG_SLUGS_QUERY);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) {
    return null;
  }

  return sanityClient.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug });
}
