import type { PageServerLoad } from "./$types";
import { fetchPostsSorted } from "$lib/utils/fetch-posts";

export const load = (async () => {
  const posts = await fetchPostsSorted();
  return { posts };
}) satisfies PageServerLoad;
