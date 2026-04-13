const WP_BASE = import.meta.env.VITE_WP_API_BASE as string | undefined;

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  titleHtml: string;
  excerptHtml: string;
  contentHtml: string;
  featuredImageUrl: string | null;
};

async function wpFetch<T>(path: string): Promise<T> {
  if (!WP_BASE || !WP_BASE.startsWith('http')) {
    throw new Error(
      'Missing VITE_WP_API_BASE. Expected something like: https://your-site.com/wp-json/wp/v2. ' +
        'Check VITE_WP_API_BASE and WordPress REST permissions.'
    );
  }
  const url = `${WP_BASE.replace(/\/$/, '')}${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  return res.json();
}

type WpEmbedded = {
  'wp:featuredmedia'?: Array<{ source_url?: string }>;
};

function postFromRaw(raw: Record<string, unknown>): WpPost {
  const feat = raw.featured_media as number | undefined;
  const embedded = raw._embedded as WpEmbedded | undefined;
  const featUrl =
    typeof feat === 'number' ? embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null : null;
  return {
    id: (raw.id as number) ?? 0,
    slug: (raw.slug as string) ?? '',
    date: (raw.date as string) ?? '',
    titleHtml: (raw.title as { rendered?: string })?.rendered ?? '',
    excerptHtml: (raw.excerpt as { rendered?: string })?.rendered ?? '',
    contentHtml: (raw.content as { rendered?: string })?.rendered ?? '',
    featuredImageUrl: featUrl ?? null,
  };
}

export async function getPosts(opts: { perPage?: number }): Promise<WpPost[]> {
  const per = opts.perPage ?? 10;
  const raw = await wpFetch<Record<string, unknown>[]>(
    `/posts?per_page=${per}&_embed`
  );
  if (!Array.isArray(raw)) return [];
  return raw.map((r) => postFromRaw(r));
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  const raw = await wpFetch<Record<string, unknown>[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed`
  );
  if (!Array.isArray(raw) || raw.length === 0) return null;
  return postFromRaw(raw[0]);
}
