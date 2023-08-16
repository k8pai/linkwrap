'use client';

import { refreshLinks } from '@/app/actions';
import { signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { TiTick } from 'react-icons/ti';

export const SignIn = () => {
	return (
		<button
			className="relative z-10 flex items-center p-2 text-sm text-gray-600 border border-zinc-800/30 rounded-md dark:focus:ring-opacity-40 focus:outline-none"
			onClick={() => signIn('google')}
		>
			<span className="hidden sm:block">Sign In With</span>
			<FcGoogle className={`h-5 w-5 sm:ml-3`} />
		</button>
	);
};

export const SignOut = ({ ...args }) => {
	return (
		<button {...args} onClick={() => signOut()}>
			Sign Out
		</button>
	);
};

export const AnimationButton = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		console.log('value of isLoading => ', isLoading);

		//   return () => {
		// 	second
		//   }
	}, [isLoading]);

	const toggle = () => setIsLoading((el) => !el);

	const action = async () => {
		if (!isLoading) {
			toggle();
			await refreshLinks();
			toggle();
		}
	};

	return (
		<form action={action}>
			<button type="submit">
				<BiRefresh className={`${isLoading ? '' : ''}`} />
			</button>
		</form>
	);
};

export function Notifier({
	heading = 'Copied To Clipboard!',
	notification = false,
}) {
	return (
		<div
			className={`w-fit absolute left-1/2 top-10 -translate-x-1/2 transition-all overflow-hidden shadow-md ${
				notification
					? 'scale-100 opacity-100 visible'
					: 'scale-95 opacity-0 invisible'
			} py-2 px-4 bg-white max-w-sm rounded-md`}
		>
			<div className="flex items-center space-x-1">
				<TiTick className={`h-5 w-5 text-green-500`} />
				<h1 className={`text-sm text-gray-900`}>{heading}</h1>
			</div>
		</div>
	);
}
