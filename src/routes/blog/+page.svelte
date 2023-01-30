<script lang="ts">
  import { formatTitle } from '$lib/utils/format-title';
  import type { PageData } from './$types';

  export let data: PageData;
  const { posts } = data;
</script>

<svelte:head>
  <title>{formatTitle('Blog')}</title>
</svelte:head>

<div class="head">
  <h1>Blog</h1>
  <img src="/images/icons/blog-32.ico" alt="Blog Icon" />
</div>
<section>
  <ul>
    {#each posts as post}
      <li>
        <div class="item">
          <span>
            <a href={post.path}>{post.metadata.title}</a>
            {#if !!post.metadata.excerpt}
              <span class="excerpt">{post.metadata.excerpt}</span>
            {/if}
          </span>
          <span class="date">{post.metadata.date}</span>
        </div>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  img {
    display: block;
    width: 64px;
    height: 64px;
    image-rendering: pixelated;
  }

  ul {
    list-style-image: url('/images/icons/notepad-16.ico');
    padding-left: 20px;
  }

  li:not(:last-child) {
    margin-bottom: 4px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .excerpt {
      display: block;
    }

    @media (min-width: 1024px) {
      .excerpt {
        display: inline;
        &:before {
          content: '- ';
        }
      }
    }
  }

  .date {
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    flex-shrink: 0;
  }
</style>
