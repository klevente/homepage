<script lang="ts">
  import { theme } from '$lib/utils/theme';

  function toggleTheme() {
    theme.toggle();
  }
</script>

<button class="theme-selector" on:click={toggleTheme} title="Switch Theme">
  <img src="/images/icons/theme-dark.ico" alt="Dark theme icon" />
  <img
    class:transparent={$theme === 'dark'}
    src="/images/icons/theme-light.ico"
    alt="Light theme icon"
  />
</button>

<style lang="scss">
  .theme-selector {
    cursor: pointer;
    position: relative;
    width: 16px; // required as the underlying `img` is `position: absolute;`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
  }
  img {
    image-rendering: pixelated;
    margin: 0;
    position: absolute;
    left: 0;
    top: 2px; // push the image down a bit so it is centered
    @media screen and (prefers-reduced-motion: no-preference) {
      -webkit-transition: opacity 150ms ease-in-out;
      -moz-transition: opacity 150ms ease-in-out;
      -o-transition: opacity 150ms ease-in-out;
      transition: opacity 150ms ease-in-out;
    }
  }
  .transparent {
    opacity: 0;
  }
</style>
