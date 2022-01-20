<script>
    import { formatDate } from '$lib/util/date.js';

    export let date;
</script>

<time datetime={date}>{formatDate(date)}</time>
