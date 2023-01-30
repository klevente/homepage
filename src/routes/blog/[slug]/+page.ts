import type { PageLoad } from './$types';
import type { SvelteComponentTyped } from 'svelte';
import type { Empty } from '$lib/types';
import type { Metadata } from '$lib/utils/fetch-posts';

export const load = (async ({ params }) => {
  const post = (await import(`../${params.slug}.md`)) as {
    metadata: Metadata;
    default: SvelteComponentTyped<Empty, Empty, Empty>;
  };

  const {
    metadata: { title, date },
    default: content,
  } = post;

  return {
    content,
    title,
    date,
  };
}) satisfies PageLoad;
