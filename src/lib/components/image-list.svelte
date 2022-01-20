<script>
    import Image from './image.svelte';
    export let images;
</script>

<div class="img-list">
    {#each images as [src, alt, width]}
        <Image {src} {alt} {width} />
    {/each}
</div>
