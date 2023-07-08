<script>
  import "$lib/styles/main.scss";
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";
</script>

<Header />

<main>
  <slot />
</main>

<Footer />

<svelte:head>
  <script>
    if (typeof document !== "undefined") {
      if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  </script>
</svelte:head>

<style lang="scss">
</style>
