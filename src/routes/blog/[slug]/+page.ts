import type { PageLoad } from "./$types";
import type { ComponentType } from "svelte";
import type { Metadata } from "$lib/utils/fetch-posts";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
  try {
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
  } catch (e) {
    error(404);
  }
}) satisfies PageLoad;
