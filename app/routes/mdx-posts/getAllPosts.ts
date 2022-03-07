import * as wk1 from './first-post.mdx';
export type Post = {
	default: Function;
	attributes: any;
	filename: string;
	meta: any;
};

function postFromModule(mod: Post) {
	return {
		slug: mod.filename.replace(/\.mdx?$/, ''),
		...mod.attributes.meta,
	};
}

const posts = [wk1].map((post: any) => postFromModule(post));

export { posts };
