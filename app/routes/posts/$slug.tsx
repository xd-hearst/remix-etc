import { json, useLoaderData } from 'remix';
import { getPostByIndex } from '../mdx-posts/getAllPosts';

export async function loader({ params }: { params: { slug: string } }) {
	return json(params.slug);
}

export default function PostSlug() {
	const slug = useLoaderData();
	let Component = null;
	let message = '';
	try {
		const index = parseInt(slug) - 1;
		Component = getPostByIndex(index);
	} catch {
		message = 'You probably have done something illegal. Or i messed up';
	}

	return (
		<div className="container mx-auto px-2 pt-8 lg:pt-16 mt-16 min-h-screen markdown-body">
			{message.length ? (
				<span className="text-sm">message</span>
			) : (
				<Component />
			)}
		</div>
	);
}
