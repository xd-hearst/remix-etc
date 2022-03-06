import { Link, useLoaderData } from 'remix';

// Import all your posts from the app/routes/posts directory. Since these are
// regular route modules, they will all be available for individual viewing
// at /posts/a, for example.
import { getPostData } from '../mdx-posts/first-post';
import Post from './post-test';

export type Post = {
	slug: string;
	title: string;
	markdown: string;
	filename: string;
	attributes: any;
};

export async function loader() {
	// Return metadata about each of the posts for display on the index page.
	// Referencing the posts here instead of in the Index component down below
	// lets us avoid bundling the actual posts themselves in the bundle for the
	// index page.
	const { code, frontmatter } = await getPostData('my-first-post');

	return [{ code, frontmatter }];
}

export default function Index() {
	const posts = useLoaderData();

	const { code, frontmatter } = posts[0];
	return <Post code={code} frontmatter={frontmatter} />;
}
