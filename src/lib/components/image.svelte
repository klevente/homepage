<script lang="ts">
  export let src: string;
  export let alt: string;
  export let caption: string | null = null;
  export let width = '100%';
</script>

<figure>
  <img {src} {alt} {width} />
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>
