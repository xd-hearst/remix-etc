import * as wk1 from './first-post.md';
import * as wk2 from './wk2.md';
import Latest from './wk2.md';

export type Post = {
	default: Function;
	attributes: any;
	filename: string;
	meta: any;
};

function postFromModule(mod: Post) {
	return {
		slug: mod.filename.replace(/\.md?$/, ''),
		...mod.attributes.meta,
	};
}

const posts = [wk2, wk1].map((post: any) => postFromModule(post));

export { posts };

export const postLinks = [
	{ to: 'mdx-posts/wk2', name: 'Week 2' },
	{ to: 'mdx-posts/first-post', name: 'Week 1' },
];

export const LatestIssue = Latest;
