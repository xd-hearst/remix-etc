import { useLoaderData } from 'remix';
import { Link } from 'remix';
import { getPosts } from '~/post';
import type { Post } from '~/post';

export const loader = async () => getPosts();

export default function Posts() {
	const posts = useLoaderData();
	console.log(posts);
	return (
		<div>
			<ul>
				{posts.map((post: Post) => (
					<li key={post.slug}>
						<Link to={post.slug}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
