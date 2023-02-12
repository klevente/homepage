<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { formatTitle } from '$lib/utils/format-title.js';

  import '$lib/styles/blog.scss';
  import '$lib/styles/code.scss';

  export let data: PageData;
  const { title, date, content } = data;

  onMount(() => {
    document.querySelectorAll('pre code').forEach((elem) => {
      elem.addEventListener('click', (event: PointerEvent) => {
        if (event.detail !== 3) {
          return;
        }
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(elem);
        selection.addRange(range);
      });
    });
  });
</script>

<svelte:head>
  <title>{formatTitle(title)}</title>
</svelte:head>

<article class="post">
  <div class="heading">
    <h1>{title}</h1>
    <time datetime={date}>
      <img src="/images/icons/calendar-16.ico" alt="Calendar Icon" /> {date}</time
    >
  </div>
  <div class="content">
    <svelte:component this={content} />
  </div>
</article>

<style lang="scss">
  img {
    image-rendering: pixelated;
    position: relative;
    top: 2px;
  }
</style>
