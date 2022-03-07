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
import globalStylesUrl from '~/styles/global.css';
import darkStylesUrl from '~/styles/dark.css';

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: globalStylesUrl },
		{
			rel: 'stylesheet',
			href: darkStylesUrl,
			media: '(prefers-color-scheme: dark)',
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
		<div className="remix-app">
			<header className="remix-app__header">
				<div className="container remix-app__header-content">
					<Link to="/" title="Remix" className="remix-app__header-home-link">
						<RemixLogo />{' '}
						<h2 style={{ paddingLeft: '.5rem' }}>Last Week Today</h2>
					</Link>
					<nav aria-label="Main navigation" className="remix-app__header-nav">
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/posts">Weekly Posts</Link>
							</li>
							<li>
								<a href="https://github.com/xd-hearst/remix-etc">GitHub</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<div className="remix-app__main">
				<div className="container remix-app__main-content">{children}</div>
			</div>
			<footer className="remix-app__footer">
				<div className="container remix-app__footer-content">
					<p>&copy; You!</p>
				</div>
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
