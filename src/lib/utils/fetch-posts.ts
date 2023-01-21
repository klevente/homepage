import type { Metadata } from '../types';

export async function fetchPosts() {
  const posts = import.meta.glob('/src/routes/blog/*.md');
  const iterablePostFiles = Object.entries(posts);

  return Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = (await resolver()) as { metadata: Metadata };
      const postPath = path.slice(11, -3);

      return {
        metadata,
        path: postPath,
      };
    }),
  );
}
