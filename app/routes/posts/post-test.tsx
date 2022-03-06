import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { Frontmatter } from '~/post.type';

export default function Post({
	code,
	frontmatter,
}: {
	code: string;
	frontmatter: Frontmatter;
}) {
	// it's generally a good idea to memoize this function call to
	// avoid re-creating the component every render.
	const Component = useMemo(() => getMDXComponent(code), [code]);
	return (
		<>
			<header>
				<h1>{frontmatter.title}</h1>
				<p>{frontmatter.description}</p>
			</header>
			<main>
				<Component />
			</main>
		</>
	);
}
