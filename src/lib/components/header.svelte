<script lang="ts">
  import ThemePicker from "$lib/components/theme-picker.svelte";
</script>

<header>
  <nav>
    <a class="home-link" href="/">
      <img src="/images/icons/computer-16.ico" alt="Home Icon" />Home
    </a>
    <a href="/about">
      <img src="/images/icons/about-me-icon-16.ico" alt="About Me Icon" />About
    </a>
    <a href="/uses">
      <img src="/images/icons/computer-magnifying-glass-16.ico" alt="Uses Icon" />Uses
    </a>
    <a href="/blog">
      <img src="/images/icons/blog-16.ico" alt="Blog Icon" />Blog
    </a>
    <ThemePicker />
  </nav>
</header>

<style lang="scss">
  nav {
    display: flex;
    gap: 12px;

    background-color: var(--accent);
    padding: 4px 8px;
    align-items: start;
    height: 20px;

    user-select: none;

    font-size: var(--font-size-header);
  }

  .home-link {
    margin-right: auto;
  }

  img {
    image-rendering: pixelated;
    position: relative;
    top: 3px;
    margin-right: 4px;
  }

  a {
    color: var(--ink);
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
