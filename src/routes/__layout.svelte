<script>
    import Header from '$lib/components/header.svelte';
    import Footer from '$lib/components/footer.svelte';
    import '$lib/styles/global.scss';
</script>

<Header />

<main>
    <slot />
</main>

<Footer />

<svelte:head>
    <script>
        import { browser } from '$app/env';

        if (browser) {
            if (localStorage.theme === 'dark') {
                document.documentElement.classList.add('dark');
            }
        }
    </script>
</svelte:head>
