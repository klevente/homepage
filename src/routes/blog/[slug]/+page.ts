import type { PageLoad } from "./$types";
import type { ComponentType } from "svelte";
import type { Metadata } from "$lib/utils/fetch-posts";

export const load = (async ({ params }) => {
  const post = (await import(`../../../../content/posts/${params.slug}.md`)) as {
    metadata: Metadata;
    default: ComponentType;
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
