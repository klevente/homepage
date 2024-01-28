---
title: Redesigning My Personal Website
date: "2022-01-08"
excerpt: How I built the previous version using SvelteKit
---

<script>
  import Image from "$lib/components/image.svelte";
  import ImageList from "$lib/components/image-list.svelte";
</script>

_Update: This is the write-up I did for the previous version of my website. If you want to see how the current version is built, check out [this post](/blog/website-redesign-2.0)._

## Introduction

I've had plans for creating a personal website for quite some time, but only acted on the urge in the beginning of 2021, where I finally bought a domain, and started building a simple homepage for my portfolio accompanied by a little blog. At that time, I fantasized of a very minimal solution that would enable me to self-host the site using [Nginx](https://www.nginx.com/), with the ability of writing blog posts in Markdown. After taking a look at a few alternatives, I resorted to static-site generation using [Eleventy](https://www.11ty.dev/), with [Nunjucks](https://mozilla.github.io/nunjucks/) as the templating language, as they both seemed like lightweight solutions offering a shallow learning-curve. I also opted to use [TailwindCSS](https://tailwindcss.com/) for styling, as I wanted to see what the fuss was about.

Long story short, I created a fully functional website with Markdown support and toggleable dark/light themes, but was never quite happy with the project layout and code quality. I felt that Tailwind was overkill for a site this simple, and configuring Eleventy to work the way I wanted to proved more difficult and time-consuming than I had hoped for. This discouraged me from working on the site and writing more blog posts, especially with a new semester starting in February.

<Image src="/images/posts/website-redesign/old-home-light.png" alt="Old Home with Light Theme" caption="Home page of my old website" />

As the year progressed, the thought of rebuilding the website got pushed back in my head by other ideas, university projects and my day job. This however was a blessing in disguise, as I had nearly a full year of getting better at web development, especially with [Svelte](https://svelte.dev/) and [Sapper](https://sapper.svelte.dev/), the technologies I chose for the frontends of my graduate project assignment and master's thesis. All in all, I really enjoyed working with them, and after submitting my thesis, I wanted to try out the successor of Sapper, [SvelteKit](https://kit.svelte.dev/), which is still in public beta as of January 2022. This re-sparked my interest in building the new version of my personal website, with SvelteKit as my tech stack of choice, as it offers rapid development, small bundle sizes and static-site generation out of the box.

## Basis

Fortunately, this desire came at the perfect time, as I discovered Josh Collinsworth's amazing [blog post](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) when browsing [r/sveltejs](https://www.reddit.com/r/sveltejs/) after a large Christmas meal, which details the basic setup and implementation of a simple Markdown-based blog, fitting most requirements of what I had in mind. While I also found similar articles about creating a SvelteKit-based blog, this was by far the most simple and elegant solution for tackling the problem, in my opinion.

This is why I decided to create my website based off of Josh's ideas, which is exactly what I did. If you want to see how the foundation and architecture is implemented, I highly recommend to check out the [post](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) over on his website, it is well worth a read. The rest of my post will focus on any changes and improvements I made, which will also be a great reference for future me, in case I forget the nitty-gritty details of something that came up during development.

## My Improvements

### Cleanup

The first thing I did after getting an initial working prototype in place is to refactor the code a bit in order to make it more modular and easier to understand at a quick glance. This mainly involved the functionality behind the `api/posts.json` endpoint, as it hard-coded the logic creating a list out of available blog posts, which is also required for creating an RSS feed, so I isolated and moved it into a standalone JavaScript file inside the `lib/util` directory. I also created a separate method for fetching blog posts in chronological order, which enables other sorting strategies to be implemented in the future. In the end, my version of the post fetching code looks like this:

```js
/* lib/util/posts.js */
export async function fetchPosts() {
  return Promise.all(
    Object.entries(import.meta.glob("../../routes/blog/*.md")).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      // cut off path until start of the filename, also removing the file extension
      const slug = path.slice(12, -3);
      return { ...metadata, slug };
    }),
  );
}

export async function fetchPostsSorted() {
  return fetchPosts()
    .then((posts) => posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
}
```

```js
/* routes/api/posts.json.js */
import { fetchPostsSorted } from "$lib/util/posts.js";

export async function get() {
  const sortedPosts = await fetchPostsSorted();

  return {
    // this returns a `200 OK` response with the supplied `body`
    body: sortedPosts,
  };
}
```

### Dark Mode Toggle

In order to accommodate both light and dark mode _enthusiasts_, I knew I had to implement some way of toggling between a dark and light mode on the site. Thankfully, I already had a similar feature inside the old version of the site, so it was just a matter of porting it over - or so I thought. For theme changing, I decided to implement it similarly to how Tailwind [does it](https://tailwindcss.com/docs/dark-mode), by way of utilizing [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) and marking the root DOM element with a special class when the user decides to use dark mode. As CSS variables work by resolving to the most specific candidate at all times, this enables the developer to define alternate color schemes for any number of themes, which in my case, was 2. The basic setup of such theming is the following:

```scss
:root {
  /* light theme colors */
  --paper: #ffffff;
  --ink: #000000;

  &.dark {
    /* dark theme colors */
    --paper: #000000;
    --ink: #ffffff;
  }
}
```

Now, on to the more complicated step, which is actually managing theme toggling and saving, so the site will load the user's preferred theme the next time they visit. For this, I decided to utilize a Svelte [store](https://svelte.dev/tutorial/writable-stores), as I became quite accustomed to using them effectively during my thesis project. They basically provide a storage mechanism that notifies its subscribers every time its internal value changes, a perfect way for performing various updates reactively.

In order to make theme changes permanent, the currently selected theme is saved into [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), which was also quite easy thanks to the store. All this can be viewed in action by checking out the code snippet below.

```js
/* lib/utils/theme.js */
import { writable } from "svelte/store";
import { browser } from "$app/env";

// create and export the store, so it is accessible from anywhere
export const theme = createThemeStore();

function createThemeStore() {
  // get the saved theme from `localStorage`
  const stored = getStoredTheme();
  // create the store, use a light theme if no stored value was available
  const { subscribe, update } = writable(stored || "light");

  // this line creates a custom store that can integrate with Svelte,
  // as it only requires that a valid `subscribe` method is present on an object
  // in order to classify as a store
  return {
    subscribe,
    // return a helper function as well for toggling themes
    toggle: () => {
      update((value) => (value === "dark" ? "light" : "dark"));
    },
  };
}

function getStoredTheme() {
  return browser ? localStorage.theme : null;
}

// create a subsription that manages the `.dark` class on the `html` DOM element and
// saves the current theme into `localStorage`
// every time the internal `value` changes
theme.subscribe((value) => {
  // this check is required because SvelteKit also runs code on its internal server,
  // which does not have access to the browser's API, so it must be checked that
  // the code actually runs in the browser before using `document`, `window`, etc.
  if (browser) {
    const rootClasses = document.documentElement.classList;
    if (value === "dark") {
      rootClasses.add("dark");
    } else {
      rootClasses.remove("dark");
    }
    localStorage.theme = value;
  }
});
```

Now, all that needs to be done is to wire up something that calls `theme.toggle()` somewhere and the website's theme system is done! Or wait...

Unfortunately, the initialization of the `theme` store happens just a tiny bit later after the initial page load, resulting in the dreaded [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) phenomenon, meaning that if the user who chose a dark theme revisits the site later, they will see the light theme for a fraction of a second - just enough to blind them when browsing the site in the middle of the night.

In order to fix this problem, I found Shawn's [solution](https://www.swyx.io/avoid-fotc/), which is to put a tiny code snippet inside the `head` for every page, that puts the appropriate theme class on the root element. Because this JavaScript gets executed before the actual site's contents are rendered, there will be no bright flash haunting the user. The following code illustrates exactly how I implemented this logic.

```svelte
<!-- routes/__layout.svelte -->
<svelte:head>
  <script>
    // while this worked in a previous version of SvelteKit,
    // it is not happy with importing `$app/env` as of the most recent version
    /* import { browser } from "$app/env"; */

    // check location by querying whether the `document` global is available,
    // as importing the `browser` variable no longer works
    if (/* browser */ typeof document !== "undefined") {
      if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  </script>
</svelte:head>
```

The last piece of the puzzle is actually having a component on screen that calls `theme.toggle()` whenever the user clicks on it. I encapsulated this logic inside a `ThemePicker` component, which handles theme changes and provides information about the currently selected theme to the user. This is achieved by having two different icons that transition from one to the other when the user clicks on them, alongside with actually changing the site's theme. I got the transition from [this](http://css3.bradshawenterprises.com/cfimg/) guide, you can check out below how it all comes together.

```svelte
<!-- lib/components/theme-picker.svelte -->
<script>
  import { theme } from "$lib/util/theme";
</script>

<div class="theme-selector" on:click={() => theme.toggle()} title="Switch Theme">
  <img src="/images/dark.png" alt="Dark theme icon" />
  <!-- 
    only add the `transparent` class to the light theme icon
    if the current theme is dark, which will show the dark theme icon,
    else the light theme icon  will cover up the dark one as it will be visible.
    this updates every time the `theme` store changes as it is prefixed by `$`
  -->
  <img class:transparent={$theme === "dark"} src="/images/light.png" alt="Light theme icon" />
</div>

<style lang="scss">
  .theme-selector {
    cursor: pointer;
    position: relative;
    width: 30px; /* required as the underlying `img` is `position: absolute;` */
  }

  img {
    margin: 0;
    position: absolute;
    left: 0;
    top: -2px; /* push the image up a bit so it is centered */
    -webkit-transition: opacity 150ms ease-in-out;
    -moz-transition: opacity 150ms ease-in-out;
    -o-transition: opacity 150ms ease-in-out;
    transition: opacity 150ms ease-in-out;
  }

  .transparent {
    opacity: 0;
  }
</style>
```

### Styling

With the theme-toggling functionality in place, next I needed to actually come up with a pleasant-looking light and dark theme for the site. Unfortunately, I do not possess very good design skills, so this was a somewhat difficult task, though I managed to learn and gather some experience regarding colors and creating color schemes from scratch, which I had been interested in for some time.

#### Typography

The easiest part regarding theming was font choices, as I am quite ~~font~~ fond of the Fira font family, namely [Fira Sans](https://fonts.google.com/specimen/Fira+Sans) and [Fira Code](https://github.com/tonsky/FiraCode), so I decided to use them for my website as well. However, instead of pulling them in through [Google Fonts](https://fonts.google.com/), I decided to self-host them myself, so my page does not make requests to 3rd parties upon loading. To make this process easier, I utilized [google-webfonts-helper](http://google-webfonts-helper.herokuapp.com/fonts), a simple wep app for downloading fonts found on Google Fonts in various formats, while also offering the appropriate CSS `@font-face` directives for embedding them inside your website.

#### Color Schemes

As far as themes go, I knew I wanted something resembling [Windows 98](https://en.wikipedia.org/wiki/Windows_98#/media/File:Windows98.png), as I really like its default color scheme with that signature dark green background and gray taskbar. However, I did not really want my website blooming in full green, so I opted to use it as an accent instead, with the gray set as a background color. For the dark theme, I just reused the values from my old website, as I am quite happy with how that turned out back then.

Regarding the color scheme of code snippets, I wanted to create a completely custom style that would synergize well with the rest of the site. I achieved this by sampling a few Windows 98 colors using the Colour Picker tool in Paint, while generating the rest using [Coolors](https://coolors.co/). For creating the actual color scheme CSS file to be used by [Prism](https://prismjs.com/), I used this little [tool](http://k88hudson.github.io/syntax-highlighting-theme-generator/www/), iterating different over colors until I found the one I liked the most. In the end, I think it turned out to be quite stylish and readable, both in light and dark mode.

#### Icons

In addition to colors, I also wanted the site's icons to resemble the ones found in early Windows releases. For this, I created some using [this](https://redketchup.io/icon-editor) icon editor, taking inspiration from the originals by extracting them from the `.dll` and `.exe` files found inside a Windows 98 `.iso` image using [IconsExtract](https://www.nirsoft.net/utils/iconsext.html).

### 404 Page

Finally, I wanted to create a dedicated error page the Nginx would use when someone navigates to a page that doesn't exist, instead of the default built-in one. This however required some additional research, as `adapter-static` currently does not support pre-rendering a custom error page by itself. I also had to look up how to attach a custom error page to a subdomain inside Nginx's config.

For the first problem, I found this [Reddit comment](https://www.reddit.com/r/sveltejs/comments/o1tr4w/comment/h726jte/?utm_source=reddit&utm_medium=web2x&context=3) that outlines how to create a static `404` page that can be wired up for Nginx to use. This basically means I had to create a `404.svelte` page with the desired content (in older versions of SvelteKit/`adapter-static`, I also had to create a `postbuild` script that moves the resulting `404/index.html` file out to the project root as `404.html`, but that is no longer necessary, as the adapter generates the `404.html` file by default instead of putting it inside a subdirectory).

In order to configure Nginx to use this page as the `404` error display, I followed [this](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-to-use-custom-error-pages-on-ubuntu-14-04) guide to a certain extent. Instead of configuring a global error page for all sites hosted, I only added the following code snippet my site's Nginx config:

```nginx
# /etc/nginx/sites-available/name-of-site #
server {
  ...
  error_page 404 /404.html # name of the file inside the site's folder
  location = /404.html {
    root /var/www/name-of-site;
    internal; # do not host the file, just use it as an error page
  }
  ...
}
```

## Wrap-Up

All in all, I am quite happy with how the new site turned out, and hoping that I will utilize it more than I did the last one. I'm sure I'll find more ways to improve it later on, as something comes up during writing or an idea pops into my head. If you would like to take a look at the source more in-depth, you can do so by checking out the GitHub [repository](https://github.com/klevente/homepage).
