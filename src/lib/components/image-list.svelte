<script lang="ts">
  export let images: [string, string, string][];
  export let caption: string | null = null;
</script>

<figure class="img-list">
  {#each images as [src, alt, width]}
    <img {src} {alt} {width} />
  {/each}
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>
