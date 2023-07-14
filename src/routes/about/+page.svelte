<script lang="ts">
  import { formatTitle } from "$lib/utils/format-title";
  import PageHeading from "$lib/components/page-heading.svelte";
</script>

<svelte:head>
  <title>{formatTitle("About")}</title>
</svelte:head>

<PageHeading>
  <div slot="left">
    <h1>About me</h1>
    <p>Some facts in a neatly-organized bulleted list.</p>
  </div>
  <img slot="right" class="header-image" src="/images/profile-64x64.png" alt="Profile" />
</PageHeading>
<h3>Professionally:</h3>
<section>
  Full-stack software engineer at
  <a rel="noopener noreferrer" target="_blank" href="https://snapsoft.io">SnapSoft</a>, working for
  <a rel="noopener noreferrer" target="_blank" href="https://moonfare.com">Moonfare</a>.
</section>
<h3>Previously:</h3>
<section>
  <ul>
    <li>Full-stack software engineer at Generali.</li>
    <li>Budapest University of Technology and Economics Computer Engineering graduate.</li>
    <li>Seminar instructor at Budapest University of Technology and Economics.</li>
  </ul>
</section>
<h3>Personally:</h3>
<section>
  <ul>
    <li>Hobby coder.</li>
    <li>Tea drinker.</li>
    <li>Aviation enthusiast with a pilot's license.</li>
    <li>Music enjoyer, violin and guitar player, occasional DJ.</li>
  </ul>
</section>
<h3>Contact:</h3>
<section>
  <ul>
    <li>
      <a rel="noopener noreferrer" target="_blank" href="https://github.com/klevente">GitHub</a>
    </li>
    <li>
      <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/klevente_"
        >@klevente_
      </a>
    </li>
    <li>Email: in my GitHub profile</li>
  </ul>
</section>

<style lang="scss">
  img {
    width: 128px;
    height: 128px;
  }
</style>
