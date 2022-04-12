import * as wk1 from './first-post.md';
import * as wk2 from './wk2.md';
import * as wk3 from './wk3.md';
import * as wk4 from './wk4.md';
import * as wk5 from './wk5.md';
import Latest from './wk5.md';

export type Post = {
	default: Function;
	attributes: any;
	filename: string;
	meta: any;
	slug: string;
	index: number;
	title: string;
	description: string;
};

const postsCollection = [wk5, wk4, wk3, wk2, wk1];
const totalCount = postsCollection.length;

function postFromModule(mod: Post, index: number) {
	return {
		slug: mod.filename.replace(/\.md?$/, ''),
		default: mod.default,
		index: totalCount - index,
		...mod.attributes.meta,
	};
}

const posts = postsCollection.map((post: any, index) =>
	postFromModule(post, index),
);

export { posts };

export const postLinks = posts.map((post) => ({
	to: `posts/${post.index}`,
	name: `Week ${post.index}`,
}));

export function getPostByIndex(index: number) {
	const reverse = posts.slice().reverse();
	return reverse[index].default;
}

export const LatestIssue = Latest;
