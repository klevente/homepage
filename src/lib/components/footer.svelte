<script>
    import GithubIcon from './icons/github-icon.svelte';
    import TwitterIcon from './icons/twitter-icon.svelte';
</script>

<footer>
    <div>
        &copy; 2022
    </div>
    <div>
        <a class="github-link" href="https://github.com/klevente" target="_blank" rel="noopener noreferrer">
            <GithubIcon />
        </a>
        <a class="twitter-link" href="https://twitter.com/klevente_" target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
        </a>
    </div>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-between;
        padding: 8px 8px 0 8px;
    }

    .github-link {
        padding-right: 4px;
    }
</style>
