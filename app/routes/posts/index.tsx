import { Link, useLoaderData } from 'remix';

import { posts, Post } from '../mdx-posts/getAllPosts';

export async function loader({}) {
	return posts;
}

export default function Index() {
	const posts = useLoaderData();
	return (
		<div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16 min-h-screen">
			<ul>
				{posts.map((post: Post) => (
					<li key={post.slug} className="py-2 md:my-0">
						<Link to={`/posts/${post.index}`}>
							<h4 className="font-bold">{post.title}</h4>
						</Link>
						{post.description ? <p>{post.description}</p> : null}
					</li>
				))}
			</ul>
		</div>
	);
}
