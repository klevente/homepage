<script>
    import Date from '$lib/components/date.svelte';
    import { formatTitle } from '$lib/util/title';

    import '$lib/styles/post.scss';
    import '$lib/styles/code.scss';

    export let title;
    export let date;
</script>

<svelte:head>
    <title>{formatTitle(title)}</title>
    <meta property="og:title" content="{title}"/>
</svelte:head>

<div class="heading">
    <h1>{title}</h1>
    <div class="date-container">
        <img src="/images/icons/calendar-16.ico" alt="Calendar icon">
        <span class="date"><Date {date}/></span>
    </div>
</div>

<article>
    <slot/>
</article>

<style lang="scss">
  img {
    display: inline;
    vertical-align: middle;
    margin: 0;
  }

  .date {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .date-container {
    flex-shrink: 0;
  }
</style>
