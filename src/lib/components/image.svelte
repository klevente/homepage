<script>
    export let src;
    export let alt;
    export let caption = null;
    export let width = "100%";
</script>

<figure>
    <img {src} {alt} {width}>
    {#if !!caption}
        <figcaption>{caption}</figcaption>
    {/if}
</figure>
