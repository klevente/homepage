<script>
    import { formatTitle } from '$lib/util/title.js';
</script>

<svelte:head>
    <title>{formatTitle('Not Found')}</title>
</svelte:head>

<section>
    <h1>404: Page Not Found</h1>
    <ul>
        <li><a href="/"> &lt; Home</a></li>
        <li><a href="/blog"> &lt; Blog</a></li>
    </ul>
</section>

<style lang="scss">
  ul {
    list-style: none;
    margin: 0;
    padding: 0 0 0 1rem;
  }
</style>
