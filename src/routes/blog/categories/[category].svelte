<script>
    import PostList from '$lib/components/post-list.svelte';

    export let category;
    export let posts;
</script>

<h1>Posts related to '{category}'</h1>

<PostList {posts} />
