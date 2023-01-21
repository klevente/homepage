<script>
  import '$lib/styles/style.scss';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
</script>

<Header />

<main>
  <div class="title-bar">
    <div class="title-bar-title">Home</div>
    <div class="title-bar-buttons">
      <div class="title-bar-button" />
      <div class="title-bar-button" />
    </div>
  </div>
  <slot />
</main>

<Footer />
