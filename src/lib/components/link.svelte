<script lang="ts">
  export let href: string;
  export let newTab: boolean = false;
</script>

<a {href} rel="noopener noreferrer" target={newTab ? "_blank" : undefined}>
  <slot />
</a>
