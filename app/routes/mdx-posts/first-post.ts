import { bundleMDX } from '../../mdx.server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remarkMdxImages } from 'remark-mdx-images';
const mdxDirectory = 'posts';
const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some description
---

# Wahoo

import Demo from './demo'

Here's a **neat** demo:

<Demo />
`.trim();

async function getFirstPost() {
	const result = await bundleMDX({
		source: mdxSource,
		files: {
			'./demo.tsx': `
import * as React from 'react'

function Demo() {
  return <div>Neat demo!</div>
}

export default Demo
    `,
		},
	});
	const { code, frontmatter } = result;

	return { code, frontmatter };
}

export { getFirstPost };
const blogDirectory = path.join(process.cwd(), 'posts');

async function getPostData(slug: string) {
	const fullPath = path.join(blogDirectory, `${slug}.md`);
	const source = fs.readFileSync(fullPath, 'utf8');

	const { code, frontmatter } = await bundleMDX({
		source,
		xdmOptions: (options) => {
			options.remarkPlugins = [remarkMdxImages];
			return options;
		},
	});

	return {
		slug,
		frontmatter,
		code,
	};
}

export { getPostData };
