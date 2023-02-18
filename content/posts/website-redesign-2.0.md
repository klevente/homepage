---
title: Website Redesign 2.0
date: '2023-02-18'
excerpt: Second time is the charm
---

<script>
  import Image from '$lib/components/image.svelte';
  import ImageList from '$lib/components/image-list.svelte';
</script>

## Introduction

Another year, another website update, and like clockwork, I seem to come back to my website at the start of every year, with great ambitions. However, this time it was a bit different, as I actually had a task to accomplish: SvelteKit 1.0 was [finally released](https://svelte.dev/blog/announcing-sveltekit-1.0), so I had to update the site to actually make use of it, which also gave me a nice excuse to see all the changes that were made since I last used it to build the [previous version](/blog/website-redesign). And boy there were a [lot of changes](https://github.com/sveltejs/kit/discussions/5748).

As last time I used Josh Collinsworth's [blog post](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) as a start, I decided to check out whether he made any updates to it to accommodate to the new SvelteKit changes, and he actually did! After skimming through it, I decided it'll be a good starting point for re-architecting and got to work. While I was at it, I also wanted to try out a different visual design for the site, but more on that later.

## SvelteKit 1.0 Impressions

The main point of this redesign was to update the project to use SvelteKit 1.0, which introduced a number of changes to routing, the `load` function and directory structure. I remember being quite sceptical initially when reading Rich's [GitHub issue](https://github.com/sveltejs/kit/discussions/5748) about the upcoming changes to file naming, but after reading about it a bit more and seeing that even the [NextJS 13](https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory) prescribes similar rules to naming files and directories, I thought that I can get used to it (even though I think not having `+`s in front of special files looks a bit better in the file tree, like in Next).

The place where this impacted the project most was the handling of individual blog posts, where we could previously have the post Markdown files inside the directory where we wanted our posts to live under, and let MDsveX handle the conversion to HTML, resulting in them being available under their own route. However, in SvelteKit 1.0, routes cannot be defined using a file only (like `about.svelte`), instead, a folder must be created for them (`about/+page.svelte`).

To solve this issue, I followed Josh's solution to create a catch-all route named `[slug]` inside the `blog` subdirectory, which is then used to render all available blog posts using a `load` function (living in `+page.ts`) that pulls in the Svelte component MDsveX generated using `await import`. Then, inside `+page.svelte`, this component is mounted using the dynamic component syntax. The only caveat with this approach, is that as far as SvelteKit's client-side navigator is concerned, all blog posts live on the same path, which means we need some additional logic to handle the case where we want to navigate between blog posts directly, as Svelte won't know by default that it needs to change the content that is displayed. Fortunately, this issue is not present when JavaScript is turned off, as then all navigation is handled by the browser instead. Take a look at the solution for this below.

```ts
/* blog/[slug]/+page.ts */
export const load = (async ({ params }) => {
  const post = (await import(`../../../content/posts/${params.slug}.md`)) as {
    metadata: Metadata;
    default: SvelteComponentTyped<{}, {}, {}>;
  };

  const {
    metadata: { title, date },
    default: content,
  } = post;

  return {
    content,
    title,
    date,
  };
}) satisfies PageLoad;
```

```svelte
<!-- blog/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  let title: string;
  let date: string;
  let content: SvelteComponentTyped<Empty, Empty, Empty>;
  // make `title`, `date` and `content` reactive, meaning that
  // every time `data` changes, they should be automatically updated,
  // resulting in a re-render of the post with the new metadata and content
  $: ({ title, date, content } = data);
</script>

<article>
  <h1>{title}</h1>
  <time>{date}</time>
  <svelte:component this={content} />
</article>
```

This strategy also made me move all blog posts to the root of the project tree into a dedicated `content` folder, which is very convenient and overall a nice separation of concerns.

### TypeScript

As you may have noticed above, I also started to use TypeScript for this revamp, as I wanted to try out the support for it that was advertised, and overall, my feelings about it are quite mixed.

On the one hand, it's quite nice to have type safety, with a plethora of generated types for `load` functions enabling end-to-end type safety (like [tRPC](https://trpc.io/)), but they still left me with a sour taste, as WebStorm could not infer them properly, resulting in no IntelliSense at all inside Svelte components. Still, at least `svelte-check` worked correctly and provided me with errors when I ran it. Even better, VSCode's TypeScript server could infer the type correctly, so fortunately it means that this task is not practically impossible.

<Image src="/images/posts/website-redesign-2.0/sveltekit-typescript-infer.png" alt="TypeScript Inference in Action" caption="TypeScript Inference in Action" />

All in all, I think it's still great to have the kind of TypeScript support SvelteKit has, and I hope the JetBrains plugin will catch up to speed and allow us to use it to its fullest potential. End-to-end type safety is the name of the game in 2023, so it's nice to see SvelteKit going down this path as well.

## An Aside: Astro

Before moving onto the new design changes, I wanted to mention another technology I considered for my website, which is arguably the best tool for building static sites with minimal interactivity at the time of writing. I'm talking about [Astro](https://astro.build/) of course, an extremely easy-to-use static site generator, offering support for all frameworks like React, Svelte and Vue and client-side interactivity using the [islands architecture](https://docs.astro.build/en/concepts/islands/).

I really liked the concept shipping absolutely no JavaScript to the client unless it is absolutely required, and decided to build a small blog with it in just a couple of hours, as the developer experience is superb - built-in Markdown and MDX support is an absolute god-send.

My only caveat with Astro was it's main selling point as well: shipping no JS to the client means that there is no client-side navigation as well, which I think is a very nice UX feature if done well - and SvelteKit in SSG-mode does it really well, where for the first page load, the whole HTML gets returned, alongside a tiny bundle of JS containing the client-side renderer, which takes over for subsequent navigations. For a static site, this means absolutely no flashes of content, of which I experienced some when testing out Astro, albeit I had a very specific header layout where this flash was very noticeable, and for other designs would have probably been fine.

In the end, because of this, I decided to return to SvelteKit, though I am definitely keeping Astro in mind for future websites where the focus is on static content, as it is a very powerful tool for the right job. They recently released Astro 2 with [Content Collections](https://docs.astro.build/en/guides/content-collections/), which I need to try sometime.

## The Failed New Design

As mentioned in my previous redesign post, I am a huge fan of 90s software design, with Windows 98 being my absolute favourite aesthetic (maybe because it was the first Windows version I ever used, who knows). So my original idea was to create an authentic recreation of some Windows 98 UI elements, and build a site out of those. I've also known about [98.css](https://jdan.github.io/98.css/) for a long time, but I wanted all visuals designed by myself, as I not everything I wanted to use was available in the library.

After a bunch of trial and error, I managed to ~~hack together~~ build a pretty nice-looking home and blog post list page.

<Image src="/images/posts/website-redesign-2.0/home-page-test-design.png" alt="Homepage for the Test Design" caption="Homepage for the test design" />

However, then came the problems, mainly the ones with font rendering, which you have probably noticed when looking at the picture, namely that all text looks like when some water has been spilled onto a newspaper. This happens because of one simple reason: there is [no cross-platform way](https://bugzilla.mozilla.org/show_bug.cgi?id=640134) to tell the browser not to antialias text when rendering a font - especially a bitmap font.

So why is this? After a bit of searching, we can easily find the [`font-smooth`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth) CSS property, though with a warning at the top of the page stating that  it is non-standard. What is more, is that it also recommends 2 other non-standard, vendor-prefixed selectors named `-webkit-font-smoothing` and `-moz-osx-font-smoothing`, which only work on MacOS interestingly. Unsurprisingly, when trying to use this any of these properties on a Windows machine, nothing will happen, and the font will still be antialiased (in DevTools, Chrome will even complain that it does not recognize the `font-smooth` property). However, on Mac, when using `font-smooth: never` and `-webkit-font-smoothing: none` will result in nice and crispy text for bitmap fonts.

<ImageList images={[
['/images/posts/website-redesign-2.0/bitmap-font-windows.png', 'Bitmap rendering on Windows', '200px'],
['/images/posts/website-redesign-2.0/bitmap-font-macos.png', 'Bitmap rendering on MacOS', '200px'],
]}
caption="Bitmap fonts on Windows and MacOS" />

After a bit of research and going down the rabbit hole, it seems like because of some OS and browser specific reasons, there is really no way as of now to turn font antialiasing off in a predictable manner, and working with bitmap fonts across multiple font sizes is also a painful exercise, as these fonts are made to look good only at specific font sizes. This really made me reconsider my options, and in the end change the whole design course, with opting for something more modern, with still a touch of 90s sprinkled on it. That said, I might try creating something, like a component library or showcase from what I already achieved.

<Image src="/images/posts/website-redesign-2.0/blog-posts-test-design.png" alt="Blog Post List for the Test Design" caption="Blog post list for the test design" />

## The New New Design

As mentioned above, I threw out the original idea of re-creating a Windows 98-like UI, because without a bitmap font, it just does not look authentic, and instead tried to make something simple but in a similar character using vector fonts. Firstly, I went into my Windows 98 VM and chose a pleasant colour scheme to use as the basis of my site, which was the Slate theme with nice blues and grays.

<Image src="/images/posts/website-redesign-2.0/windows-98-slate-theme.png" alt="Windows 98 Slate Theme" caption="Windows 98 Slate theme" />

I extracted the color values from the theme, and then tried to experiment with them, mainly using [Coolors](https://coolors.co/) for generating palettes - what you see throughout the site is what I came up with in the end. I also knew that serif fonts give a sort of 90s vibe (nothing better than opening a document on an old computer that has Times New Roman as the font), so I decided to choose one for body text. For contrast, I kept the heading and header/footer font a sans one. Just like last time, I used the [Google Webfont Helper](https://gwfh.mranftl.com/fonts) tool to download font files in `.ttf`, `.woff` and `.woff2` formats.

One of my favourite design elements of Windows 98 are all the icons it has, of which some similar ones I utilised on my previous website - for this version, I decided to lean on them a bit more heavily (but not too heavily). For most icons, I went with the 16x16 variant, with the 32x32 variants (scaled to 64x64) of them used as a heading illustration for some pages. Obtaining the icons was still done with the wonderful [IconsExtract](https://www.nirsoft.net/utils/iconsext.html) program.

### Theming

As far as the themes itself go, I still opted for a light and dark one, mainly using the same techniques for selecting colors and implementing the switching and theme saving as in the last version of my website - if you want to check out how I did it, take a look at my [previous blog post](/blog/website-redesign) in this topic, as the solution is virtually unchanged.

## 404 Page Shenanigans

As described in my last redesign post, I wanted a custom 404 page that Nginx would render in case the user navigated to a page that does not exist. For this, I followed [this Reddit comment](https://www.reddit.com/r/sveltejs/comments/o1tr4w/comment/h726jte/) as guide to create the page using Svelte, so I could use all my layouts and components for it.

However, after updating to SvelteKit 1.0, this method no longer worked out-of-the-box, so I had to investigate a bit. Basically, I uncovered 2 entangled problems, one of which was there since my first SvelteKit version was deployed to Nginx:
1. When navigating to any sub-routes first, ex. `https://klevente.dev/blog` would return `403 Forbidden`. This would also surface if the user disabled JavaScript, thus falling back to server-side navigation and clicking a link on the home page
2. The 404 page's HTML would load, but for nested nonexistent routes (like `a/b`), the styles would be missing

Before showing you the solution to these problems, let's take a look at what the Nginx config was for my page that caused these issues:

```nginx
server {
  ...
  location / {
    try_files $uri $uri/ $uri.html =404;
  }
  error_page 404 /404.html # name of the file inside the site's folder
  location = /404.html {
    root /var/www/name-of-site;
    internal; # do not host the file, just use it as an error page
  }
  ...
}
```

The first problem occurred because:
- `adapter-static` generates pages as files, not as directories with `index.html` inside of them (this can actually be configured with the [`trailingSlash`](https://kit.svelte.dev/docs/page-options#trailingslash) option)
- As per the config, when a request comes in to a URL, ex. `/blog`, Nginx will first look for a file named the `blog`, then a directory named `blog`, then `blog.html`
- Because the folder option is before the `.html` option, Nginx will determine that there is no folder with that URL inside the server root, so it'll throw a `403` error

To solve this, I re-ordered the entries in the Nginx config to search for the entry ending with `.html` first before moving onto the directory case:

```nginx
server {
  ...
  location / {
    try_files $uri $uri.html $uri/ =404;
  }
  ...
}
```

As for the second problem, this is because generating a 404 page using the Reddit comment's method is a scenario that `adapter-static` is not prepared for, namely that we want to use the generated page under a different path than what it was inside the project - and of course, we want to use it for every path that does not map to a valid page, not just for `https://klevente.dev/404`!

The issue stems from the fact that the generated page references all assets (CSS, JS, etc.) via a relative path, starting with `./` for the `404` page as it is a top-level route, being inside the `routes` folder. This means that when a user opens a nested non-existed route, like `/a/b`, the browser tries to load everything starting from `/a`, but there will not be anything there, as all static assets are at the root level.

```html
<!-- 404.html -->
<head>
  ...
  <link rel="icon" href="./favicon.ico" />
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="content-security-policy" content="">
  <link href="./_app/immutable/assets/_layout-04928389.css" rel="stylesheet">
  <link href="./_app/immutable/assets/_page-d4c74bdd.css" rel="stylesheet">
  <link href="./_app/immutable/assets/page-heading-9fc13c5e.css" rel="stylesheet">
</head>
```

After a considerable amount of searching, I haven't found a way to configure `adapter-static` to only use absolute paths for static assets, which would work all the time, so I decided on a hacky solution and wrote a small Node script to change all relative paths to absolute ones inside the generated `404.html` file - basically the `.` character needs to be removed from the start of all links pointing to static assets. This script gets run automatically after running `vite build` when using `npm run build`.

```js
import fs from 'fs/promises';

const path = 'build/404.html';
const pattern = /\.\/_app/g;
const replacement = '/_app';

const page = await fs.readFile(path, 'utf-8');
const replaced = page.replaceAll(pattern, replacement);
await fs.writeFile(path, replaced);
```

## CI Setup

As I've had this website for 2 years now, I got pretty tired of manually deploying the site each time I changed something, so I invested a bit of time to set up a small CI pipeline to automate this deployment for me. Of course, if I was using Vercel/Netlify, then this task would be as trivial as ticking a box on the dashboard, but I like to tinker around with self-hosting, so I viewed this as another fun challenge.

In the end, it turned out that this task is not much harder than ticking a checkbox on Vercel, as I just needed to use the [`rsync-deployments`](https://github.com/Burnett01/rsync-deployments) GitHub action, which just takes a few parameters identifying the host and authenticating the runner with it. When using it, make sure to place all sensitive information inside GitHub Secrets, so nothing gets exposed!

Additionally, I'll leave here some steps on how to set up your SSH key, which might prove useful for others (and for myself as I always forget this):
1. Create an SSH key on your server by running `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add the public key's contents as a new line into `~/.ssh/authorized_keys`
3. Add the private key as a repository secret

## Triple-Click to Copy

Finally, I want to present a small quality-of-life feature I replicated from the [Advent of Code](https://adventofcode.com/) website, where one can select the contents of a code block by triple-clicking it. I thought this is a nice and easy way to provide code copying functionality that is non-intrusive (though I guess it's a bit too hidden as well).

The main reason I went for this instead of a "Copy" button inside code blocks is simple: it's [not trivial](https://github.com/pngwn/MDsveX/issues/385) to get it set up currently with MDsveX, as one would have to reconfigure the whole code formatting pipeline to achieve it, for which I did not have the motivation to figure out, albeit [completely feasible to do it](https://github.com/gitpod-io/website/pull/2322).

That said, I just opted to add a simple click event listener to all code blocks, which selects the contents in case the user triple-clicked:

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  onMount(() => {
    document.querySelectorAll('pre code').forEach((elem) => {
      elem.addEventListener('click', (event: PointerEvent) => {
        if (event.detail !== 3) {
          // only care about triple-clicks
          return;
        }
        const selection = window.getSelection();
        // remove any selection that was there before
        selection.removeAllRanges();
        const range = document.createRange();
        // select the contents of the code block
        range.selectNodeContents(elem);
        // and add it to the selection
        selection.addRange(range);
      });
    });
  });
</script>
```

## Wrap-Up

And this is it! Overall, I'm quite happy with how the site turned out; I'm especially proud of how I managed to use the icons and how good they look in both light and dark mode. I'm sure I'll make additional improvements as I go along, but so far, as always, I learned a bunch of things about SvelteKit and frontend development in general. If you want to see more details of how the site works exactly, feel free to check out the [GitHub repository](https://github.com/klevente/homepage).
