import adapter from "@sveltejs/adapter-static";
import sveltePreprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import autoprefixer from "autoprefixer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: [".md"],
    }),
    sveltePreprocess({
      scss: {
        prependData: `@import 'src/lib/styles/vars.scss';`,
      },
      postcss: {
        plugins: [autoprefixer()],
      },
    }),
  ],

  extensions: [".svelte", ".md"],

  kit: {
    adapter: adapter(),
  },
};

export default config;
