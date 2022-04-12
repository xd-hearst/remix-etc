import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from 'remix';
import type { LinksFunction } from 'remix';
import tailwind from '~/tailwind.css';
import mardownCss from '~/styles/markdown.css';

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: tailwind,
		},
		{
			rel: 'stylesheet',
			href: mardownCss,
		},
		{
			rel: 'shortcut icon',
			href: './favicon.svg',
		},
	];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	);
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);
	return (
		<Document title="Error!">
			<Layout>
				<div>
					<h1>There was an error</h1>
					<p>{error.message}</p>
					<hr />
					<p>
						Hey, developer, you should replace this with what you want your
						users to see.
					</p>
				</div>
			</Layout>
		</Document>
	);
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
	let caught = useCatch();

	let message;
	switch (caught.status) {
		case 401:
			message = (
				<p>
					Oops! Looks like you tried to visit a page that you do not have access
					to.
				</p>
			);
			break;
		case 404:
			message = (
				<p>Oops! Looks like you tried to visit a page that does not exist.</p>
			);
			break;

		default:
			throw new Error(caught.data || caught.statusText);
	}

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<Layout>
				<h1>
					{caught.status}: {caught.statusText}
				</h1>
				{message}
			</Layout>
		</Document>
	);
}

function Document({
	children,
	title,
}: {
	children: React.ReactNode;
	title?: string;
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{title ? <title>{title}</title> : null}
				<Meta />

				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	);
}

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<header className="fixed w-full z-10 top-0 bg-white border-b border-gray-400">
				<div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
					<div className="pl-4 flex items-center">
						<div style={{ width: '45px' }}>
							<RemixLogo />{' '}
						</div>
						<Link
							to="/"
							title="Remix"
							className="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl"
						>
							<h2 style={{ paddingLeft: '.5rem' }}>Last Week Today</h2>
						</Link>
					</div>
					<div className="block lg:hidden pr-4">
						<button
							id="nav-toggle"
							className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-purple-500 appearance-none focus:outline-none"
						>
							<svg
								className="fill-current h-3 w-3"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Menu</title>
								<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
							</svg>
						</button>
					</div>
					<div
						className="w-full flex-grow lg:flex lg:content-center lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 z-20 hidden"
						id="nav-content"
					>
						<div className="flex-1 w-full mx-auto max-w-sm content-center py-4 lg:py-0">
							<div className="relative pull-right pl-4 pr-4 md:pr-0">
								<input
									type="search"
									placeholder="Search"
									className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"
								/>
								<div
									className="absolute search-icon"
									style={{ top: '0.375rem', left: '1.75rem' }}
								>
									<svg
										className="fill-current pointer-events-none text-gray-800 w-4 h-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
									</svg>
								</div>
							</div>
						</div>
						<ul className="list-reset lg:flex justify-end items-center">
							<li className="mr-3 py-2 lg:py-0">
								<Link to="/">Home</Link>
							</li>
							<li className="mr-3 py-2 lg:py-0">
								<Link
									className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-2 px-4"
									to="/posts"
								>
									Weekly Posts
								</Link>
							</li>
							<li className="mr-3 py-2 lg:py-0">
								<a
									className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-2 px-4"
									href="https://github.com/xd-hearst/remix-etc"
								>
									GitHub
								</a>
							</li>
						</ul>
					</div>
				</div>
			</header>
			<div className="bg-gray-100 tracking-wider tracking-normal">
				<div>{children}</div>
			</div>
			<footer className="bg-white border-t border-gray-400 shadow fixed bottom-0 w-full z-10">
				<div className="container mx-auto flex">
					<div className="w-full mx-auto flex flex-wrap">
						<div className="flex w-full lg:w-1/2 ">
							<div className="px-8">
								<h3 className="font-bold text-gray-900"></h3>
								<p className="py-4 text-gray-600 text-sm">
									&copy; An infinite deal of nothing
								</p>
							</div>
						</div>
						<div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
							<div className="px-8">
								<ul className="list-reset items-center text-sm pt-3">
									<li>
										<a
											className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-1"
											href="#"
										>
											&copy; 2022
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div></div>
			</footer>
		</div>
	);
}

function RemixLogo() {
	return (
		<svg
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 512 512"
		>
			<path
				style={{ fill: '#FFDB2D;' }}
				d="M472.187,488.107H39.813C17.86,488.107,0,470.247,0,448.294V162.702
	c0-9.425,7.641-17.067,17.067-17.067h477.867c9.425,0,17.067,7.641,17.067,17.067v285.591
	C512,470.247,494.14,488.107,472.187,488.107z"
			/>
			<g>
				<path
					style={{ fill: '#FF9900;' }}
					d="M494.933,145.636H256v342.471h216.187c21.953,0,39.813-17.86,39.813-39.813V162.702
		C512,153.277,504.359,145.636,494.933,145.636z"
				/>
				<polygon
					style={{ fill: '#FF9900;' }}
					points="512,317.44 401.636,317.44 401.636,145.636 367.502,145.636 367.502,317.44 273.067,317.44 
		273.067,145.636 238.933,145.636 238.933,317.44 145.636,317.44 145.636,145.636 111.502,145.636 111.502,317.44 0,317.44 
		0,350.436 111.502,350.436 111.502,488.107 145.636,488.107 145.636,350.436 238.933,350.436 238.933,488.107 273.067,488.107 
		273.067,350.436 367.502,350.436 367.502,488.107 400.498,488.107 400.498,351.573 512,351.573 	"
				/>
			</g>
			<g>
				<polygon
					style={{ fill: '#FF4F19;' }}
					points="400.498,317.44 400.498,145.636 367.502,145.636 367.502,317.44 273.067,317.44 
		273.067,145.636 256,145.636 256,488.107 273.067,488.107 273.067,350.436 367.502,350.436 367.502,488.107 400.498,488.107 
		400.498,351.573 512,351.573 512,317.44 	"
				/>
				<path
					style={{ fill: '#FF4F19;' }}
					d="M512,179.769H0V94.438c0-21.994,17.83-39.825,39.824-39.825h432.351
		c21.994,0,39.824,17.83,39.824,39.825V179.769z"
				/>
			</g>
			<path
				style={{ fill: '#816142;' }}
				d="M126.293,119.467c-9.425,0-17.067-7.641-17.067-17.067V40.96c0-9.425,7.641-17.067,17.067-17.067
	s17.067,7.641,17.067,17.067v61.44C143.36,111.825,135.719,119.467,126.293,119.467z"
			/>
			<path
				style={{ fill: '#FC0023;' }}
				d="M512,94.438c0-21.994-17.83-39.825-39.824-39.825H256v125.156h256V94.438z"
			/>
			<path
				style={{ fill: '#543F29;' }}
				d="M385.707,119.467c-9.425,0-17.067-7.641-17.067-17.067V40.96c0-9.425,7.641-17.067,17.067-17.067
	c9.425,0,17.067,7.641,17.067,17.067v61.44C402.773,111.825,395.132,119.467,385.707,119.467z"
			/>
		</svg>
	);
}
