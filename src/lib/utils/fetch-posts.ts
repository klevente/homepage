import fs from 'fs/promises';
import type { Metadata, MetadataWithSize } from '../types';

export type PostData = {
  metadata: MetadataWithSize;
  path: string;
};

export async function fetchPosts(): Promise<PostData[]> {
  const posts = import.meta.glob('/src/routes/blog/*.md');
  const iterablePostFiles = Object.entries(posts);

  return Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const relativePath = path.slice(1);
      const postPath = relativePath.slice(10, -3);
      const [{ metadata }, { size }] = await Promise.all([
        resolver() as Promise<{ metadata: Metadata }>,
        fs.stat(relativePath),
      ]);

      return {
        metadata: {
          ...metadata,
          size,
        },
        path: postPath,
      };
    }),
  );
}
