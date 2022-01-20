<script context="module">
    export async function load({ params, fetch }) {
        const currentCategory = params.category;
        const response = await fetch('/api/posts.json');
        const posts = await response.json();

        const matchingPosts = posts.filter(post => post.meta.categories.includes(currentCategory));

        return {
            props: {
                category: currentCategory,
                posts: matchingPosts,
            },
        };
    }
</script>

<script>
    import PostList from '$lib/components/post-list.svelte';

    export let category;
    export let posts;
</script>

<h1>Posts related to '{category}'</h1>

<PostList {posts} />
