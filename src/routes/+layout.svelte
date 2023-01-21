<script>
  import '$lib/styles/style.scss';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
</script>

<Header />

<main>
  <slot />
</main>

<Footer />
