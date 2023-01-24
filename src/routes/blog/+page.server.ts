import type { PageServerLoad } from './$types';
import { fetchPosts } from '$lib/utils/fetch-posts';

export const load = (async () => {
  const posts = await fetchPosts();
  const totalSize = posts.reduce((acc, next) => acc + next.metadata.size, 0);
  return { posts, totalSize };
}) satisfies PageServerLoad;
