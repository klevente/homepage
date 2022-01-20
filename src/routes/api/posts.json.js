import { fetchPostsSorted } from '$lib/util/posts.js';

export async function get() {
    const sortedPosts = await fetchPostsSorted();

    return {
        body: sortedPosts
    };
}
