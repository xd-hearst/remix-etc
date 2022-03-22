import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import LastNightToday from '~/imgs/last-week-tonight.jpg';
import { postLinks, LatestIssue } from './mdx-posts/getAllPosts';

type IndexData = {
	resources: Array<{ name: string; url: string }>;
	postLinks: Array<{ name: string; to: string }>;
	people: Array<{ name: string; to: string }>;
};

export let loader: LoaderFunction = () => {
	let data: IndexData = {
		resources: [
			{
				name: 'From JavaScript to React',
				url: 'https://nextjs.org/learn/foundations/from-javascript-to-react',
			},
			{
				name: 'From React to Next.js',
				url: 'https://nextjs.org/learn/foundations/from-react-to-nextjs',
			},
			{
				name: 'How Next.js Works',
				url: 'https://nextjs.org/learn/foundations/how-nextjs-works',
			},
			{
				name: 'how modern browsers work - part 1',
				url: 'https://developers.google.com/web/updates/2018/09/inside-browser-part1',
			},
			{
				name: 'how modern browsers work - part 2',
				url: 'https://developers.google.com/web/updates/2018/09/inside-browser-part2',
			},
			{
				name: 'how modern browsers work - part 3',
				url: 'https://developers.google.com/web/updates/2018/09/inside-browser-part3',
			},
			{
				name: 'how modern browsers work - part 4',
				url: 'https://developers.google.com/web/updates/2018/09/inside-browser-part4',
			},
		],
		postLinks,
		people: [
			{
				to: 'https://twitter.com/addyosmani',
				name: 'Andy Osmani',
			},
			{
				to: 'https://twitter.com/kentcdodds',
				name: 'Kent C Dodds',
			},
			{
				to: 'https://twitter.com/ryanflorence',
				name: 'Ryan Florence',
			},
		],
	};

	// https://remix.run/api/remix#json
	return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
	return {
		title: 'Last week today',
		description:
			'Weekly link list of useful links for reading, when you feel you have not had enough of JavaScript, etc',
	};
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
	let data = useLoaderData<IndexData>();

	return (
		<div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
			<main className="w-full lg:w-4/5 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
				<p className="mb-2 md:pb-0 text-sm">
					Just when you think you have had enough of JavaScript, React, Next Js
					... and all that Jazz (js) 🥳
				</p>
				<p className="mb-2 md:pb-0 text-sm">
					This is my collection of weekly links of things that might seem
					important at this fleeting moment in the universe of web development.
					JavaScript, React, Next Js, Remix, CSS.
				</p>
				<p className="mb-2 md:pb-0 text-sm">
					A lot of the links I simply collected from work. Why not?
				</p>
				<div style={{ maxWidth: '500px' }} className="py-4  markdown-body">
					<LatestIssue />
				</div>
			</main>
			<aside className="w-full lg:w-1/5 lg:px-6 text-xl text-gray-800 leading-normal">
				<p className="text-base font-bold py-2 lg:pb-6 text-gray-700">
					Weekly Issues
				</p>
				<div className="w-full inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20">
					<ul className="list-reset">
						{data.postLinks.map((demo) => (
							<li
								key={demo.to}
								className="py-2 md:my-0 hover:bg-purple-100 lg:hover:bg-transparent"
							>
								<Link
									to={demo.to}
									prefetch="intent"
									className="block pl-2 align-middle text-gray-700 no-underline hover:text-purple-500 border-l-4 border-transparent lg:hover:border-purple-500"
								>
									<span className="pb-1 md:pb-0 text-sm">{demo.name}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<p className="text-base font-bold py-2 lg:pb-6 text-gray-700">
					Fundamentals
				</p>
				<div className="w-full inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20">
					<ul className="list-reset">
						{data.resources.map((resource) => (
							<li
								key={resource.url}
								className="py-2 md:my-0 hover:bg-purple-100 lg:hover:bg-transparent"
							>
								<a href={resource.url}>
									<span className="pb-1 md:pb-0 text-sm">{resource.name}</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</aside>
		</div>
	);
}
