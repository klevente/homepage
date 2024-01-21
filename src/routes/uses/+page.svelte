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
      JavaScript/TypeScript: My most used languages currently. Mainly working with React, Express
      and Nest.js professionally, but I also like to use SvelteKit and Next.js for personal
      projects.
    </li>
    <li>
      Java/Kotlin: My runner-up duo in most-used languages. I mainly used them to build Spring-based
      backend applications.
    </li>
    <li>
      Rust: Language I'm most interested in, because of its very strong type system and compile-time
      memory safety. Have some experience in building tiny CLI apps and backends with
      <Link href="https://actix.rs/" newTab>Actix</Link>
      and
      <Link href="https://github.com/tokio-rs/axum" newTab>Axum</Link>
      .
    </li>
  </ul>

  <h3>Tools</h3>
  <ul>
    <li>
      <Link href="https://jetbrains.com/idea/" newTab>IntelliJ IDEA</Link>
      /
      <Link href="https://jetbrains.com/webstorm/" newTab>WebStorm</Link>
      /
      <Link href="https://jetbrains.com/rust/" newTab>RustRover</Link>
      : for most of my development work, I use IntelliJ products. I only use a few extensions as they
      have most features I need built-in:
      <ul>
        <li>
          <Link href="https://plugins.jetbrains.com/plugin/18682-catppuccin-theme" newTab
            >Catppuccin</Link
          >
          : Pleasant, warm pastel-y color scheme.
        </li>
        <li>
          <Link href="https://plugins.jetbrains.com/plugin/10321-nord" newTab>Nord</Link>
          : Cool (
          <del>literally </del>
          ) color scheme.
        </li>
      </ul>
    </li>
    <li>
      <Link href="https://code.visualstudio.com/" newTab>VSCode</Link>
      : My go-to text editor when I want to quickly edit some files or work with LaTeX. I use the following
      extensions and color schemes:
      <ul>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig"
            newTab
          >
            EditorConfig
          </Link>
          : Enables support for <code>.editorconfig</code> files.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=sainnhe.everforest"
            newTab
          >
            Everforest
          </Link>
          : Nice pastel green colors, easy on the eyes.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.hexeditor"
            newTab
          >
            Hex Editor
          </Link>
          : For easily checking the content of binary files.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings"
          >
            IntelliJ IDEA Keybindings
          </Link>
          : as I'm used to IntelliJ keybindings, this extension helps me use shortcuts I already know.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=tecosaur.latex-utilities"
            newTab
          >
            LaTeX Utilities
          </Link>
          : Add-on for LaTeX Workshop, adding more nice-to-have features.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop"
            newTab
          >
            LaTeX Workshop
          </Link>
          : Extension for LaTeX support in VSCode.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one"
            newTab
          >
            Markdown All in One
          </Link>
          : Adds convenient Markdown editing features, like better list handling and table formatting.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf"
            newTab
          >
            Markdown PDF
          </Link>
          : Converts a Markdown document into a PDF, useful when sharing with others.
        </li>
        <li>
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces"
            newTab
          >
            Trailing Spaces
          </Link>
          : As VSCode does not remove trailing spaces by default, this extension helps me get rid of
          them effectively.
        </li>
      </ul>
    </li>
    <li>
      <Link href="https://github.com/tonsky/FiraCode" newTab>Fira Code</Link>
      : My favourite monospace font; I cannot live without
      <Link href="https://en.wikipedia.org/wiki/Ligature_(writing)" newTab>ligatures</Link>
      .
    </li>
  </ul>

  <h2>Hardware</h2>
  <ul>
    <li>
      <Link href="https://candykeys.com/product/race-3-iso-uk" newTab>Vortex Race 3 Keyboard</Link>
      : Retro-style 75% keyboard; I have the MX Brown version.
    </li>
    <li>
      <Link
        href="https://www.tesmart.com/products/tesmart-hdmi-kvm-switcher-2-computer-to-1-monitor-tv-4k-60hz"
        >TESmart KVM Switch
      </Link>
      : For switching between 2 computers effortlessly.
    </li>
  </ul>

  <h2>Utility</h2>
  <ul>
    <li>
      <Link href="https://obsidian.md/" newTab>Obsidian</Link>
      : For Markdown-based note-taking.
    </li>
    <li>
      <Link href="https://github.com/Schniz/fnm" newTab>fnm</Link>
      : Enables automatic switching between Node versions when <code>cd</code>ing into a directory
      with a <code>.nvmrc</code> file. Much faster than
      <Link href="https://github.com/nvm-sh/nvm" newTab>nvm</Link>
      , as it's written in Rust, not shell.
    </li>
  </ul>
</article>

<style lang="scss">
</style>
