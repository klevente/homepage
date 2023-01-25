<script lang="ts">
  import type { PageData } from './$types';
  import { formatTitle } from '$lib/utils/format-title.js';

  import '$lib/styles/blog.scss';
  import '$lib/styles/code.scss';

  export let data: PageData;
  const { title, date, content } = data;
</script>

<svelte:head>
  <title>{formatTitle(title)}</title>
</svelte:head>

<article class="post">
  <div class="heading">
    <h1>{title}</h1>
    <p><img src="/images/icons/calendar-16.ico" alt="calendar-icon" /> {date}</p>
  </div>
  <div class="content">
    <svelte:component this={content} />
  </div>
</article>

<style lang="scss">
  img {
    image-rendering: pixelated;
  }

  .heading {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    margin: 4px 0 0;
    padding: 12px;
    border-top: 2px solid var(--outline-br-light);
    border-right: 2px solid var(--outline-tl-light);
    border-bottom: 2px solid var(--outline-tl-light);
    border-left: 2px solid var(--outline-br-light);

    box-shadow: inset 0 2px 0 0 var(--outline-tl-light), inset -2px 0 0 0 var(--outline-br-light),
      inset 0 -2px 0 0 var(--outline-br-light), inset 2px 0 0 0 var(--outline-tl-light);
  }

  p {
    position: relative;
    top: 4px;
  }

  .content {
    margin: 4px 0 0;
    // padding: 12px;
    /*border-top: 2px solid var(--outline-br-light);
    border-right: 2px solid var(--outline-tl-light);
    border-bottom: 2px solid var(--outline-tl-light);
    border-left: 2px solid var(--outline-br-light);

    box-shadow: inset 0 2px 0 0 var(--outline-tl-light), inset -2px 0 0 0 var(--outline-br-light),
      inset 0 -2px 0 0 var(--outline-br-light), inset 2px 0 0 0 var(--outline-tl-light);*/
  }
</style>
