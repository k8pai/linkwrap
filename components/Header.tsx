'use client';

import Link from 'next/link';
import React from 'react';
import { SiGithub } from 'react-icons/si';
import { signIn, signOut, useSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Header = () => {
	const { data, status } = useSession();

	if (!data) {
		console.log('not logged in!');
	} else {
		console.log('logged in as ...', data.user?.email);
	}

	return (
		<header className="p-8">
			<nav className="flex justify-between items-center">
				<div>
					<Link href="/" className="text-black font-semibold text-xl">
						LinkWrap
					</Link>
				</div>
				<div className="flex flex-row space-x-6">
					<Link href="/" className="text-black">
						Home
					</Link>
					<Link href="/history" className="text-black">
						History
					</Link>
					<div>
						<Link
							href="https://github.com/k8pai/linkwrap"
							className="text-black"
							target="_blank"
						>
							<SiGithub className={`w-6 h-6`} />
						</Link>
					</div>
					<div>
						{data?.user?.email ? (
							<button onClick={() => signOut()}>Sign Out</button>
						) : (
							<button onClick={() => signIn('google')}>
								Sign In
							</button>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
