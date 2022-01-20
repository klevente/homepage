<script>
    import { formatTitle } from '$lib/util/title.js';
</script>

<svelte:head>
    <title>{formatTitle('Home')}</title>
</svelte:head>

<section class="intro">
    <div>
        <h1>Levente Krizsán</h1>
        <h2 class="sub">Software Engineer</h2>
    </div>
    <img class="profile" src="/images/profile.png" alt="Profile">
</section>
<section class="about-me">
    <h2>About Me</h2>
    <p>Backend Java developer at Generali and graduate student at BME, living in Budapest. Previously held seminar
        courses in Java and backend development for undegrad students. Also worked on creating and grading midterms/homework
        for a graduate course involving formal methods.
    </p>
    <p>Currently I like tinkering with
        <code>Kotlin</code>,
        <code>Svelte</code>,
        <code>Rust</code>,
        <code>WebAssembly</code> and functional programming
        during my studies and for fun. You can take a look at my personal projects on
        <a href="https://github.com/klevente" target="_blank" rel="noopener noreferrer">Github</a>.
    </p>
</section>
<section class="contact">
    <h2>Contact</h2>
    <p>
        You can find me on <a href="https://twitter.com/klevente_" target="_blank" rel="noopener noreferrer">Twitter</a>,
        <a href="https://github.com/klevente" target="_blank" rel="noopener noreferrer">Github</a>,
        or send an email to <a>krizsanlev[at]gmail[dot]com</a>.
    </p>
</section>

<style lang="scss">
  .intro {
    display: flex;
    justify-content: space-between;
  }

  .profile {
    width: 8rem;
    height: 8rem;
    margin: 0;
  }

  h1 {
    font-size: 3.75rem;
    font-weight: 400;
    line-height: 1;

    /*display: flex;
    align-items: center;
    gap: 2px;

    @keyframes cursor-blink {
      0% {
        opacity: 0;
      }
    }

    &::after {
      content: "|";
      width: 25px;
      height: 3.75rem;
      font-size: 3.75rem;
      font-weight: 200;
      background: var(--accent);
      display: inline-block;
      animation: cursor-blink 1s steps(2) infinite;
    }*/
  }

  h2 {
    margin: 0;
  }

  .sub {
    font-size: 2.25rem;
    font-weight: 300;
  }

</style>
