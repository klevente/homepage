<script lang="ts">
  import Image from './image.svelte';

  export let images: [string, string, string][];
</script>

<div class="img-list">
  {#each images as [src, alt, width]}
    <Image {src} {alt} {width} />
  {/each}
</div>
