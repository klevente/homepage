<script>
    import ThemePicker from './theme-picker.svelte';
</script>

<header>
    <a href="/">klevente.dev</a>

    <nav>
        <ul>
            <li><a href="/blog">Blog</a></li>
            <li aria-hidden="true"><ThemePicker /></li>
        </ul>
    </nav>
</header>

<style lang="scss">
  header {
    padding: 0.5rem 1rem;
    background: var(--accent);
    border-radius: var(--radius);

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  }

  ul {
    margin: 0;
    list-style-type: none;
    display: flex;
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-family: var(--mono-font);
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
