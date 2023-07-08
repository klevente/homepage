<script lang="ts">
  import { formatTitle } from "$lib/utils/format-title";
  import PageHeading from "$lib/components/page-heading.svelte";
</script>

<svelte:head>
  <title>{formatTitle("Not Found")}</title>
</svelte:head>

<PageHeading>
  <h1 slot="left">404: Page Not Found</h1>
  <img slot="right" class="header-image" src="/images/icons/error-32.ico" alt="Error Icon" />
</PageHeading>
<section>
  <ul>
    <li>
      <a href="/"> <img src="/images/icons/computer-16.ico" alt="Home Icon" />Home</a>
    </li>
    <li><a href="/blog"><img src="/images/icons/blog-16.ico" alt="Blog Icon" />Blog</a></li>
  </ul>
</section>

<style lang="scss">
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li img {
    image-rendering: pixelated;
    position: relative;
    top: 3px;
    margin-right: 4px;
  }
</style>
