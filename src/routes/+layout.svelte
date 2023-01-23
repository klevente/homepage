<script>
  import '$lib/styles/style.scss';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
</script>

<Header />

<main>
  <div class="title-bar">
    <div class="title-bar-title">System Properties</div>
    <div class="title-bar-buttons">
      <div class="title-bar-button" />
      <div class="title-bar-button" />
    </div>
  </div>
  <article>
    <slot />
  </article>
</main>

<Footer />

<style lang="scss">
  main {
    background-color: var(--main);

    border-top: 1px solid var(--outline-tl-dark);
    border-right: 1px solid var(--outline-br-dark);
    border-bottom: 1px solid var(--outline-br-dark);
    border-left: 1px solid var(--outline-tl-dark);

    box-shadow: inset 0 1px 0 0 var(--outline-tl-light), inset -1px 0 0 0 var(--outline-br-light),
      inset 0 -1px 0 0 var(--outline-br-light), inset 1px 0 0 0 var(--outline-tl-light);
  }

  .title-bar {
    font-weight: bold;
    font-size: 11px;
    height: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--accent);
    margin: 2px;
    cursor: default;
    user-select: none;
  }

  .title-bar-buttons {
    display: flex;
    gap: 2px;
    padding-right: 2px;
  }

  .title-bar-button {
    width: 12px;
    height: 12px;
    background-color: var(--main);

    border-top: 1px solid var(--outline-tl-light);
    border-right: 1px solid var(--outline-br-dark);
    border-bottom: 1px solid var(--outline-br-dark);
    border-left: 1px solid var(--outline-tl-light);

    box-shadow: inset 0 1px 0 0 var(--outline-tl-dark), inset -1px 0 0 0 var(--outline-br-light),
      inset 0 -1px 0 0 var(--outline-br-light), inset 1px 0 0 0 var(--outline-tl-dark);
  }

  .title-bar-title {
    padding-left: 4px;
    color: white;
    margin-top: -5px;
  }

  article {
    padding: 12px;
  }
</style>
