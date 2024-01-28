<script lang="ts">
  import { formatTitle } from "$lib/utils/format-title";
  import PageHeading from "$lib/components/page-heading.svelte";
  import Link from "$lib/components/link.svelte";
</script>

<svelte:head>
  <title>{formatTitle("Uses")}</title>
</svelte:head>

<article>
  <PageHeading>
    <div slot="left">
      <h1>Stuff I Use</h1>
      <p>Here are the things I use in my professional and hobby programming endeavours.</p>
    </div>
    <img
      slot="right"
      class="header-image"
      src="/images/icons/computer-magnifying-glass-32.ico"
      alt="Uses Icon"
    />
  </PageHeading>

  <h2>Development</h2>

  <h3>Languages/Frameworks</h3>
  <ul>
    <li>
      Rust: The primary language I use both professionally and personally. At work I use <Link
        href="https://github.com/seanmonstar/warp"
        newTab>warp</Link
      >, but also have experience building web apps with <Link href="https://actix.rs/" newTab
        >Actix</Link
      >
      and <Link href="https://github.com/tokio-rs/axum" newTab>Axum</Link>.
    </li>
    <li>
      JavaScript/TypeScript: My second-most used pair of languages. Worked a lot with <Link
        href="https://react.dev/"
        newTab>React</Link
      >, <Link href="https://expressjs.com/" newTab>Express</Link> and <Link
        href="https://nestjs.com/"
        newTab>Nest.js</Link
      > professionally, nowadays I like to use <Link href="https://kit.svelte.dev/" newTab
        >SvelteKit</Link
      >, <Link href="https://nextjs.org/" newTab>Next.js</Link> and <Link
        href="https://remix.run/"
        newTab>Remix</Link
      > for personal projects.
    </li>
    <li>
      Java/Kotlin: The first languages I used in professional projects, for building <Link
        href="https://spring.io/"
        newTab>Spring</Link
      >-based web applications.
    </li>
  </ul>

  <h3>Tools</h3>
  <ul>
    <li>
      <Link href="https://jetbrains.com/idea/" newTab>IntelliJ IDEA</Link>
      /
      <Link href="https://jetbrains.com/webstorm/" newTab>WebStorm</Link>
      /
      <Link href="https://jetbrains.com/rust/" newTab>RustRover</Link>: for most of my development
      work, I use IntelliJ products. Only using a few extensions as they have most features I desire
      built-in:
      <ul>
        <li>
          <Link href="https://plugins.jetbrains.com/plugin/18682-catppuccin-theme" newTab
            >Catppuccin</Link
          >: Pleasant, warm pastel-y color scheme.
        </li>
        <li>
          <Link href="https://plugins.jetbrains.com/plugin/10321-nord" newTab>Nord</Link>: Cool (<del
            >literally</del
          >) color scheme.
        </li>
      </ul>
    </li>
    <li>
      <Link href="https://code.visualstudio.com/" newTab>VSCode</Link>: My go-to text editor when I
      want to quickly edit some files or work with LaTeX. I use the following extensions and color
      schemes:
      <ul>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig"
            newTab
          >
            EditorConfig</Link
          >: Enables support for <code>.editorconfig</code> files.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=sainnhe.everforest"
            newTab
          >
            Everforest</Link
          >: Nice pastel green colors, easy on the eyes.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.hexeditor"
            newTab
          >
            Hex Editor</Link
          >: For easily checking the content of binary files.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings"
          >
            IntelliJ IDEA Keybindings</Link
          >: as I'm used to IntelliJ keybindings, this extension helps me use shortcuts I already
          know.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=tecosaur.latex-utilities"
            newTab
          >
            LaTeX Utilities</Link
          >: Add-on for LaTeX Workshop, adding more nice-to-have features.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop"
            newTab
          >
            LaTeX Workshop</Link
          >: Extension for LaTeX support in VSCode.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one"
            newTab
          >
            Markdown All in One</Link
          >: Adds convenient Markdown editing features, like better list handling and table
          formatting.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf"
            newTab
          >
            Markdown PDF</Link
          >: Converts a Markdown document into a PDF, useful when sharing with others.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces"
            newTab
          >
            Trailing Spaces</Link
          >: As VSCode does not remove trailing spaces by default, this extension helps me get rid
          of them effectively.
        </li>
      </ul>
    </li>
    <li>
      <Link href="https://github.com/tonsky/FiraCode" newTab>Fira Code</Link>: My favourite
      monospace font; I cannot live without
      <Link href="https://en.wikipedia.org/wiki/Ligature_(writing)" newTab>ligatures</Link>.
    </li>
  </ul>

  <h2>Hardware</h2>
  <ul>
    <li>
      <Link href="https://vortexgear.store/products/race-3-micro-usb" newTab
        >Vortex Race 3 Keyboard</Link
      >: Retro-style 75% keyboard; I have the MX Brown version.
    </li>
    <li>
      <Link
        href="https://www.tesmart.com/products/tesmart-hdmi-kvm-switcher-2-computer-to-1-monitor-tv-4k-60hz"
        >TESmart KVM Switch</Link
      >: For switching between 2 computers effortlessly.
    </li>
  </ul>

  <h2>Utility</h2>
  <ul>
    <li>
      <Link href="https://obsidian.md/" newTab>Obsidian</Link>: For Markdown-based note-taking.
    </li>
    <li>
      <Link href="https://mise.jdx.dev/" newTab>mise</Link>: Enables seamless version switching of
      tools when navigating between projects by using <code>.mise.toml</code> or
      <code>.tool-versions</code> files.
    </li>
  </ul>
</article>

<style lang="scss">
</style>
