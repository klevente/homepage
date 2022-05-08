import { fetchPostsSorted } from '$lib/util/posts.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    const { category } = params;
    const allPosts = await fetchPostsSorted();
    const posts = allPosts.filter(post => post?.categories?.includes(category));
    return {
        body: {
            category,
            posts
        }
    };
}
