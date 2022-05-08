import { fetchPostsSorted } from '$lib/util/posts.js';

export async function get() {
    return {
        body: {
            posts: await fetchPostsSorted()
        }
    };
}
