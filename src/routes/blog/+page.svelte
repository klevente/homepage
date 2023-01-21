<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const { posts } = data;
</script>

<ul>
  {#each posts as post}
    <li>
      <a href={post.path}>{post.metadata.title}</a>
      Published: {post.metadata.date}
    </li>
  {/each}
</ul>
