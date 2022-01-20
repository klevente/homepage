<script>
    import { theme } from '../util/theme';

    function toggleTheme() {
        theme.toggle();
    }
</script>

<div class="theme-selector" on:click={toggleTheme} title="Switch Theme">
    <img src="/images/icons/theme-dark-32.ico" alt="Dark theme icon">
    <img class:transparent="{$theme === 'dark'}" src="/images/icons/theme-light-32.ico" alt="Light theme icon">
</div>

<style lang="scss">
  .theme-selector {
    cursor: pointer;
    position: relative;
    width: 30px; /* required as the underlying `img` is `position: absolute;` */
  }

  img {
    margin: 0;
    position: absolute;
    left: 0;
    top: -2px; /* push the image up a bit so it is centered */
    -webkit-transition: opacity var(--time) ease-in-out;
    -moz-transition: opacity var(--time) ease-in-out;
    -o-transition: opacity var(--time) ease-in-out;
    transition: opacity var(--time) ease-in-out;
  }

  .transparent {
    opacity: 0;
  }
</style>
