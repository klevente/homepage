export type Metadata = {
  title: string;
  date: string;
  excerpt?: string;
};

export type PostData = {
  metadata: Metadata;
  path: string;
};

export async function fetchPosts(): Promise<PostData[]> {
  const posts = import.meta.glob('/content/posts/*.md');
  const iterablePostFiles = Object.entries(posts);

  return Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const postPath = '/blog' + path.slice(path.lastIndexOf('/'), -3);
      const { metadata } = await (resolver() as Promise<{ metadata: Metadata }>);
      return {
        metadata,
        path: postPath,
      };
    }),
  );
}

export async function fetchPostsSorted(): Promise<PostData[]> {
  const posts = await fetchPosts();
  return posts.sort(
    (lhs, rhs) => new Date(rhs.metadata.date).getTime() - new Date(lhs.metadata.date).getTime(),
  );
}
