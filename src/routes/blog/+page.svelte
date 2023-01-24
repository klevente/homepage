<script lang="ts">
  import { formatTitle } from '$lib/utils/format-title';
  import { formatFileSize } from '$lib/utils/format-file-size';
  import type { PageData } from './$types';

  export let data: PageData;
  const { posts, totalSize } = data;
</script>

<svelte:head>
  <title>{formatTitle('Blog')}</title>
</svelte:head>

<section>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th class="file-size">Size</th>
        <th>Type</th>
        <th>Modified</th>
      </tr>
    </thead>
    <tbody>
      {#each posts as post}
        <tr>
          <td>
            <img src="/images/icons/notepad-16.ico" alt="icon" />
            <a href={post.path}>{post.metadata.title}</a>
          </td>
          <td class="file-size">{formatFileSize(post.metadata.size)}</td>
          <td>Text Document</td>
          <td>{post.metadata.date}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="summary">
    <div>{posts.length} object(s) (plus 1 hidden)</div>
    <div>{formatFileSize(totalSize)}</div>
    <div>My Computer</div>
  </div>
</section>

<style lang="scss">
  img {
    margin-top: 1px;
    image-rendering: pixelated;
  }
  section {
    overflow-x: auto;
  }
  table {
    text-align: left;
    width: 100%;
    background-color: var(--paper);
    border-spacing: 1px;

    border-top: 1px solid var(--outline-br-light);
    border-right: 1px solid var(--outline-tl-light);
    border-bottom: 1px solid var(--outline-tl-light);
    border-left: 1px solid var(--outline-br-light);

    box-shadow: inset 0 1px 0 0 var(--outline-br-dark), inset -1px 0 0 0 var(--outline-tl-dark),
      inset 0 -1px 0 0 var(--outline-tl-dark), inset 1px 0 0 0 var(--outline-br-dark);
  }
  th {
    user-select: none;
    font-weight: normal;
    background-color: var(--main);

    border-top: 1px solid var(--outline-tl-dark);
    border-right: 1px solid var(--outline-br-dark);
    border-bottom: 1px solid var(--outline-br-dark);
    border-left: 1px solid var(--outline-tl-dark);

    box-shadow: inset 0 1px 0 0 var(--outline-tl-light), inset -1px 0 0 0 var(--outline-br-light),
      inset 0 -1px 0 0 var(--outline-br-light), inset 1px 0 0 0 var(--outline-tl-light);

    padding-top: 2px;
    padding-left: 5px;
  }

  .file-size {
    text-align: right;
  }

  .summary {
    margin-top: 2px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2px;
  }

  .summary div {
    padding: 2px;
    border-top: 1px solid var(--outline-br-light);
    border-right: 1px solid var(--outline-tl-light);
    border-bottom: 1px solid var(--outline-tl-light);
    border-left: 1px solid var(--outline-br-light);
  }
</style>
