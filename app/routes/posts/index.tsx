import { Link, useLoaderData } from 'remix';

import { posts } from '../mdx-posts/getAllPosts';

export type Post = {
	default: Function;
	attributes: any;
	slug: string;
	title: string;
	description: string;
};

export async function loader({}) {
	return posts;
}

export default function Index() {
	const posts = useLoaderData();
	return (
		<ul>
			{posts.map((post: Post) => (
				<li key={post.slug}>
					<Link to={`/mdx-posts/${post.slug}`}>{post.title}</Link>
					{post.description ? <p>{post.description}</p> : null}
				</li>
			))}
		</ul>
	);
}
