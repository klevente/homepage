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
        // somehow this broke in the most recent SvelteKit version
        /*import { browser } from '$app/env';*/

        if (/*browser*/ typeof document !== 'undefined') {
            if (localStorage.theme === 'dark') {
                document.documentElement.classList.add('dark');
            }
        }
    </script>
</svelte:head>
