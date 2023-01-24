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
  <div class="address-bar">
    <div class="divider" />
    <div>A<span style="text-decoration: underline">d</span>dress</div>
    <div class="path-section">
      <img class="blog-icon" src="/images/icons/blog-16.ico" alt="folder" />
      <div class="path">C:\My Documents</div>
      <div class="down-arrow" />
    </div>
  </div>
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
            <img class="post-icon" src="/images/icons/notepad-16.ico" alt="icon" />
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
    <div class="num-of-files"><span>{posts.length} object(s) (plus 1 hidden)</span></div>
    <div class="total-size"><span>{formatFileSize(totalSize, true)}</span></div>
    <div class="computer">
      <span>
        <img class="computer-icon" src="/images/icons/computer-16.ico" alt="computer" />
        My Computer
      </span>
    </div>
  </div>
</section>

<style lang="scss">
  img {
    image-rendering: pixelated;
  }

  section {
    // overflow-x: auto;
  }

  .address-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 22px;

    border-top: 1px solid var(--outline-br-light);
    border-right: 1px solid var(--outline-tl-light);
    border-bottom: 1px solid var(--outline-tl-light);
    border-left: 1px solid var(--outline-br-light);

    box-shadow: inset 0 1px 0 0 var(--outline-tl-light), inset -1px 0 0 0 var(--outline-br-light),
      inset 0 -1px 0 0 var(--outline-br-light), inset 1px 0 0 0 var(--outline-tl-light);
  }

  .divider {
    margin-left: 2px;
    width: 1px;
    height: 16px;
    border-top: 1px solid var(--outline-tl-light);
    border-right: 1px solid var(--outline-br-light);
    border-bottom: 1px solid var(--outline-br-light);
    border-left: 1px solid var(--outline-tl-light);
  }

  .path-section {
    padding-left: 2px;
    position: relative;
    height: 18px;
    background-color: var(--paper);
    flex-grow: 1;
    margin-right: 4px;
    vertical-align: center;

    display: flex;
    align-items: center;
    gap: 5px;

    border-top: 1px solid var(--outline-br-light);
    border-right: 1px solid var(--outline-tl-light);
    border-bottom: 1px solid var(--outline-tl-light);
    border-left: 1px solid var(--outline-br-light);

    box-shadow: inset 0 1px 0 0 var(--outline-br-dark), inset -1px 0 0 0 var(--outline-tl-dark),
      inset 0 -1px 0 0 var(--outline-tl-dark), inset 1px 0 0 0 var(--outline-br-dark);
  }

  .path {
    flex-grow: 1;
    position: relative;
    top: 1px;
  }

  .down-arrow {
    background-color: var(--main);
    width: 12px;
    height: 14px;

    border-top: 1px solid var(--outline-tl-dark);
    border-right: 1px solid var(--outline-br-dark);
    border-bottom: 1px solid var(--outline-br-dark);
    border-left: 1px solid var(--outline-tl-dark);

    box-shadow: inset 0 1px 0 0 var(--outline-tl-light), inset -1px 0 0 0 var(--outline-br-light),
      inset 0 -1px 0 0 var(--outline-br-light), inset 1px 0 0 0 var(--outline-tl-light);
  }

  .blog-icon {
    position: relative;
    top: 1px;
  }

  .post-icon {
    margin-top: 1px;
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
    height: 16px;
    margin-top: 2px;
    display: grid;
    grid-template-columns: 3fr 1fr 2fr;
    gap: 2px;
    align-content: center;
  }

  .summary div {
    position: relative;
    border-top: 1px solid var(--outline-br-light);
    border-right: 1px solid var(--outline-tl-light);
    border-bottom: 1px solid var(--outline-tl-light);
    border-left: 1px solid var(--outline-br-light);
  }

  .num-of-files {
    padding-left: 2px;
    height: 16px;
  }

  .num-of-files span {
    position: relative;
    top: 2px;
  }

  .total-size {
    padding-left: 2px;
    height: 16px;
  }

  .total-size span {
    position: relative;
    top: 2px;
  }

  .computer {
    padding-left: 1px;
    height: 16px;
  }

  .computer span {
    position: relative;
    top: -4px;
  }

  .computer-icon {
    position: relative;
    top: 4px;
    margin-right: 2px;
  }
</style>
