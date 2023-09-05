import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Provider from '@/components/Provider';
import { FormProvider } from '@/components/FormProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL('https://linkwrap.k8pai.dev'),
	title: {
		template: '%s | Linkwrap',
		default: 'Linkwrap',
	},
	description:
		'LinkWrap is your go-to solution for effortlessly saving and managing your web links. Tired of cluttered bookmarks? Say goodbye to the chaos and simplify your digital life. With LinkWrap, organizing and accessing your favorite URLs has never been easier. Try it now and experience a stress-free way to handle your online resources.',
	authors: {
		name: 'Sudarsan k pai | k8pai',
		url: 'https://k8pai.dev',
	},
	generator: 'Next.js',
	applicationName: 'Linkwrap',
	referrer: 'origin-when-cross-origin',
	creator: 'k8pai',
	publisher: 'k8pai',
	keywords: [
		'react',
		'nextjs',
		'mongodb',
		'linkwrap',
		'k8pai',
		'linksaver',
		'savelinks',
		'pinit',
		'chrome-extention',
	],
	twitter: {
		card: 'summary_large_image',
		title: 'Linkwrap',
		description:
			'LinkWrap is your go-to solution for effortlessly saving and managing your web links. Tired of cluttered bookmarks? Say goodbye to the chaos and simplify your digital life. With LinkWrap, organizing and accessing your favorite URLs has never been easier. Try it now and experience a stress-free way to handle your online resources.',
		creator: '@k8pai',
		images: ['https://linkwrap.k8pai.dev/k8pai-logo.png'],
	},
	openGraph: {
		title: 'Linkwrap',
		description:
			'LinkWrap is your go-to solution for effortlessly saving and managing your web links. Tired of cluttered bookmarks? Say goodbye to the chaos and simplify your digital life. With LinkWrap, organizing and accessing your favorite URLs has never been easier. Try it now and experience a stress-free way to handle your online resources.',
		url: 'https://linkwrap.k8pai.dev',
		siteName: 'Linkwrap',
		images: [
			{
				url: 'https://linkwrap.k8pai.dev/k8pai-logo.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://linkwrap.k8pai.dev/k8pai-logo.png',
				width: 1800,
				height: 1600,
				alt: 'Linkwrap custom alt',
			},
		],
		type: 'website',
	},
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: '/k8pai-logo.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} flex flex-col justify-center min-h-screen h-full`}
			>
				<Provider>
					<Header />
					<FormProvider>{children}</FormProvider>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
