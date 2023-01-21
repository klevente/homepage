import type { PageLoad } from './$types';
import { fetchPosts } from '../../lib/utils/fetch-posts';

export const load = (async () => {
  return { posts: await fetchPosts() };
}) satisfies PageLoad;
