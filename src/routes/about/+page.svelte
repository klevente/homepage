<script lang="ts">
  import { formatTitle } from "$lib/utils/format-title";
  import Link from "$lib/components/link.svelte";
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
  Senior Rust Engineer @
  <Link href="https://luzmo.com" newTab>Luzmo</Link>.
</section>
<h3>Previously:</h3>
<section>
  <ul>
    <li>
      Full Stack Software Engineer @
      <Link href="https://snapsoft.io" newTab>SnapSoft</Link>, working for
      <Link href="https://moonfare.com" newTab>Moonfare</Link>.
    </li>
    <li>
      Full Stack Software Engineer @ <Link href="https://generali.com/" newTab>Generali</Link>.
    </li>
    <li>Budapest University of Technology and Economics Computer Engineering graduate.</li>
    <li>Seminar instructor @ Budapest University of Technology and Economics.</li>
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
      <Link href="https://github.com/klevente" newTab>GitHub</Link>
    </li>
    <li>
      <Link href="https://linkedin.com/in/levente-krizsan/" newTab>LinkedIn</Link>
    </li>
    <li>Email: in my GitHub profile.</li>
  </ul>
</section>

<style lang="scss">
  img {
    width: 128px;
    height: 128px;
  }
</style>
