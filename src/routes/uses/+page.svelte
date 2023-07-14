<script lang="ts">
  import { formatTitle } from "$lib/utils/format-title";
  import PageHeading from "$lib/components/page-heading.svelte";
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
      memory safety. Have some experience in building tiny CLI apps and backends with <a
        href="https://actix.rs/">Actix</a
      >
      and <a href="https://github.com/tokio-rs/axum">Axum</a>.
    </li>
  </ul>

  <h3>Tools</h3>
  <ul>
    <li>
      <a href="https://www.jetbrains.com/idea/">IntelliJ IDEA</a>/<a
        href="https://www.jetbrains.com/webstorm/">WebStorm</a
      >/<a href="https://www.jetbrains.com/clion/">CLion</a>: for most of my development work, I use
      IntelliJ products. I only use a few extensions as they have most features I need built-in:
      <ul>
        <li>
          <a href="https://plugins.jetbrains.com/plugin/18682-catppuccin-theme">Catppuccin</a>:
          Pleasant, warm pastel-y color scheme.
        </li>
        <li>
          <a href="https://plugins.jetbrains.com/plugin/10321-nord">Nord</a>: Cool (<del
            >literally</del
          >) color scheme.
        </li>
        <li>
          <a href="https://www.jetbrains.com/rust/">IntelliJ Rust</a>: Plugin for CLion,
          facilitating Rust development.
        </li>
      </ul>
    </li>
    <li>
      <a href="https://code.visualstudio.com/">VSCode</a>: My go-to text editor when I want to
      quickly edit some files or work with LaTeX. I use the following extensions and color schemes:
      <ul>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig">
            EditorConfig</a
          >: Enables support for <code>.editorconfig</code> files.
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=sainnhe.everforest">
            Everforest</a
          >: Nice pastel green colors, easy on the eyes.
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.hexeditor">
            Hex Editor</a
          >: For easily checking the content of binary files.
        </li>
        <li>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings"
          >
            IntelliJ IDEA Keybindings</a
          >: as I'm used to IntelliJ keybindings, this extension helps me use shortcuts I already
          know.
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=tecosaur.latex-utilities">
            LaTeX Utilities</a
          >: Add-on for LaTeX Workshop, adding more nice-to-have features.
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop">
            LaTeX Workshop
          </a>: Extension for LaTeX support in VSCode.
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one">
            Markdown All in One</a
          >: Adds convenient Markdown editing features, like better list handling and table
          formatting.
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf">
            Markdown PDF</a
          >: Converts a Markdown document into a PDF, useful when sharing with others.
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces">
            Trailing Spaces</a
          >: As VSCode does not remove trailing spaces by default, this extension helps me get rid
          of them effectively.
        </li>
      </ul>
    </li>
    <li>
      <a href="https://github.com/tonsky/FiraCode">Fira Code</a>: My favourite monospace font; I
      cannot live without <a href="https://en.wikipedia.org/wiki/Ligature_(writing)">ligatures</a>.
    </li>
  </ul>

  <h2>Hardware</h2>
  <ul>
    <li>
      <a href="https://candykeys.com/product/race-3-iso-uk">Vortex Race 3 Keyboard</a>: Retro-style
      75% keyboard; I have the MX Brown version.
    </li>
    <li>
      <a
        href="https://www.tesmart.com/products/tesmart-hdmi-kvm-switcher-2-computer-to-1-monitor-tv-4k-60hz"
        >TESmart KVM Switch</a
      >: For switching between 2 computers effortlessly.
    </li>
  </ul>

  <h2>Utility</h2>
  <ul>
    <li><a href="https://obsidian.md/">Obsidian</a>: For Markdown-based note-taking.</li>
    <li>
      <a href="https://github.com/Schniz/fnm">fnm</a>: Enables automatic switching between Node
      versions when <code>cd</code>ing into a directory with a <code>.nvmrc</code> file. Much faster
      than <a href="https://github.com/nvm-sh/nvm">nvm</a>, as it's written in Rust, not shell.
    </li>
  </ul>
</article>

<style lang="scss">
</style>
