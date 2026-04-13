import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const SANITY_CDN = 'https://ilu5dvrl.apicdn.sanity.io';

// En navigateur (dev + prod), on redirige les requêtes vers notre proxy pour éviter CORS.
// Le client Sanity construit toujours https://projectId.host/... donc on ne peut pas utiliser apiHost ;
// on utilise un fetch personnalisé qui réécrit l’URL vers /api/sanity/...
function createProxyFetch(): ((url: string | URL | Request, init?: RequestInit) => Promise<Response>) | undefined {
  if (typeof window === 'undefined') return undefined;
  const proxyBase = `${window.location.origin}/api/sanity`;
  return (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
    const useProxy = url.startsWith(SANITY_CDN + '/') || url.startsWith(SANITY_CDN);
    const proxyUrl = useProxy ? proxyBase + url.slice(SANITY_CDN.length) : url;
    return fetch(proxyUrl, init);
  };
}

const proxyFetch = createProxyFetch();

export const sanityClient = createClient({
  projectId: 'ilu5dvrl',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  ...(proxyFetch && { fetch: proxyFetch }),
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type SanityPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  publishedAt: string;
  body?: PortableTextBlock[];
};

export async function getPosts(): Promise<SanityPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...12] {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  mainImage,
  publishedAt,
  body
}`;
  return sanityClient.fetch(query);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  mainImage,
  publishedAt,
  body
}`;
  return sanityClient.fetch(query, { slug });
}
