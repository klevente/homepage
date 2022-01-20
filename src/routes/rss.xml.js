import { fetchPostsSorted } from '$lib/util/posts.js';

const siteUrl = 'https://klevente.dev';
const siteTitle = 'klevente.dev';
const siteDescription = `Levente Krizsán's personal website`;

export async function get() {
    const posts = await fetchPostsSorted();

    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    };
    const body = render(posts);

    return {
        headers,
        body,
    };
}

function render(posts) {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteUrl}</link>
<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
        .map(post => `<item>
<guid isPermaLink="true">${siteUrl}/${post.slug}</guid>
<title>${post.title}</title>
<link>${siteUrl}/${post.slug}</link>
<description>${post.excerpt}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`
    ).join('')}
</channel>
</rss>
`;
}
