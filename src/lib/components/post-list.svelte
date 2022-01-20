<script>
    import Date from './date.svelte';

    export let posts;
</script>

<ul>
    {#each posts as post}
        <li>
            <div class="line">
                <div>
                    <a href={post.slug}>{post.title}</a>
                    <div class="excerpt">{post.excerpt}</div>
                </div>
                <span class="date"><Date date={post.date}/></span>
            </div>
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        list-style-image: url('/images/icons/notepad-16.ico');
    }

    .line {
        display: flex;
        justify-content: space-between;
    }

    .excerpt {
        display: block;
    }

    @media(min-width: $xs) {
        .excerpt {
            display: inline;

            &:before {
              content: '- ';
            }
        }
    }

    .date {
        flex-shrink: 0;
    }
</style>
