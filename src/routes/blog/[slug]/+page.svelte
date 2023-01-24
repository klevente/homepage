<script lang="ts">
  import type { PageData } from './$types';
  import { formatTitle } from '$lib/utils/format-title.js';

  export let data: PageData;
  const { title, date, content } = data;
</script>

<svelte:head>
  <title>{formatTitle(title)}</title>
</svelte:head>

<article>
  <h1>{title}</h1>
  <p>Published: {date}</p>
  <svelte:component this={content} />
</article>

<style lang="scss">
  :global(code) {
    font-family: 'Cozette';
  }
</style>
