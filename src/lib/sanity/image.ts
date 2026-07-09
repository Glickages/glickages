import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';

import type { SanityImageSource } from './types';

export const imageBuilder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source);
}
