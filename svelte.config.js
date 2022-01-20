import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte',
	},

	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocess({
			scss: {
				prependData: `@import 'src/lib/styles/_vars.scss';`
			},
		}),
		mdsvex({
			extensions: ['.md'],
			layout: 'src/routes/blog/_post.svelte',
			rehypePlugins: [
				rehypeSlug, // adds IDs to headings
				rehypeAutolinkHeadings, // add links to headings that have IDs
			],
		}),
	],
};

export default config;
