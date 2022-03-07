import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import LastNightToday from '~/imgs/last-week-tonight.jpg';

type IndexData = {
	resources: Array<{ name: string; url: string }>;
	demos: Array<{ name: string; to: string }>;
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
		demos: [
			{
				to: 'mdx-posts/first-post',
				name: 'Week 1',
			},
		],
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
		<div className="remix__page">
			<main>
				<p>
					If you think you have not had enough of JavaScript, React, Next Js ...
					and all that Jazz (js) 🥳
				</p>
				<p>
					This is my collection of weekly links of things that might seem
					important in the universe of web development. JavaScript, React, Next
					Js, Remix, css. Basic or not so basic or something entirely bizzare.
					web development stuff.
				</p>
				<p>
					A lot of links I simply collected from work. Why not? When someone
					throws you a gem, pick it up.
				</p>
				<p>
					{' '}
					<img src={LastNightToday} alt="Logo" width="100%" />
				</p>
			</main>
			<aside>
				<h2>Weekly Issues</h2>
				<ul>
					{data.demos.map((demo) => (
						<li key={demo.to} className="remix__page__resource">
							<Link to={demo.to} prefetch="intent">
								{demo.name}
							</Link>
						</li>
					))}
				</ul>
				<h2>Fundamentals</h2>
				<ul>
					{data.resources.map((resource) => (
						<li key={resource.url} className="remix__page__resource">
							<a href={resource.url}>{resource.name}</a>
						</li>
					))}
				</ul>
				<h2>Important People who tweets</h2>
				<ul>
					{data.people.map((demo) => (
						<li key={demo.to} className="remix__page__resource">
							<Link to={demo.to} prefetch="intent">
								{demo.name}
							</Link>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);
}
