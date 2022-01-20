<script context="module">
    export async function load({ fetch }) {
        const posts = await fetch('/api/posts.json');
        const allPosts = await posts.json();

        return {
            props: {
                posts: allPosts,
            },
        };
    }
</script>

<script>
    import { formatTitle } from '$lib/util/title.js';
    import PostList from '$lib/components/post-list.svelte';

    export let posts;
</script>

<svelte:head>
    <title>{formatTitle('Blog')}</title>
</svelte:head>

<h1>Blog</h1>

<PostList {posts} />
