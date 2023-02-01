<script lang="ts">
  import { formatTitle } from '$lib/utils/format-title';
  import PageHeading from '$lib/components/page-heading.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const { posts } = data;
</script>

<svelte:head>
  <title>{formatTitle('Blog')}</title>
</svelte:head>

<PageHeading>
  <h1 slot="left">Blog</h1>
  <img slot="right" class="header-image" src="/images/icons/blog-32.ico" alt="Blog Icon" />
</PageHeading>
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
