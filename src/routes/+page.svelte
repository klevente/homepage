<script lang="ts">
  import { formatTitle } from '$lib/utils/format-title';
</script>

<svelte:head>
  <title>{formatTitle('Home')}</title>
</svelte:head>

<div class="content">
  <div class="head">
    <div>
      <h1>Levente Krizsán</h1>
      <h2>Software Engineer</h2>
    </div>
    <img src="/images/64x64.png" alt="profile" />
  </div>
  <section>
    <h3>Professionally:</h3>
    Full-stack software engineer at
    <a href="https://snapsoft.io">SnapSoft</a>, working for
    <a href="https://moonfare.com">Moonfare</a>.
  </section>
  <section>
    <h3>Previously:</h3>
    Full-stack software engineer at Generali.<br />
    Budapest University of Technology Computer Engineering graduate.<br />
    Seminar instructor at Budapest University of Technology.
  </section>
  <section>
    <h3>Personally:</h3>
    Hobby coder.<br />
    Tea drinker.<br />
    Aviation enthusiast with a pilot's license.<br />
    Music enjoyer, violin and guitar player, occasional DJ.<br />
    Lover of old technology and aesthetics (as seen here).
  </section>
</div>

<style lang="scss">
  .content {
    margin: 8px 7px 12px;
    padding: 20px;

    border-top: 1px solid var(--outline-tl-light);
    border-right: 1px solid var(--outline-br-dark);
    border-bottom: 1px solid var(--outline-br-dark);
    border-left: 1px solid var(--outline-tl-light);

    box-shadow: inset 0 1px 0 0 var(--outline-tl-dark), inset -1px 0 0 0 var(--outline-br-light),
      inset 0 -1px 0 0 var(--outline-br-light), inset 1px 0 0 0 var(--outline-tl-dark);
  }

  img {
    display: block;
    width: 128px;
    height: 128px;
    image-rendering: pixelated;
  }
  h1 {
    margin: 0;
  }
  h3 {
    margin-bottom: 4px;
  }

  .head {
    display: flex;
    justify-content: space-between;
  }
</style>
