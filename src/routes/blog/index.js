import { fetchPostsSorted } from '$lib/util/posts.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    return {
        body: {
            posts: await fetchPostsSorted()
        }
    };
}
