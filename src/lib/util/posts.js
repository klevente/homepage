export async function fetchPosts() {
    return Promise.all(
        Object.entries(import.meta.glob('../../routes/blog/*.md'))
            .map(async ([path, resolver]) => {
                const { metadata } = await resolver();
                const slug = path.slice(12, -3);
                return { ...metadata, slug };
            })
    );
}

export async function fetchPostsSorted() {
    return fetchPosts().then(posts => posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
}
