import Link from 'next/link';
import React from 'react';
import { SiGithub } from 'react-icons/si';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { SignIn } from './actions';
import UserDropdown from './UserDropdown';

const Header = async () => {
	const session = await getServerSession(authOptions);

	return (
		<header className="p-4 md:p-8">
			<nav className="flex justify-between items-center">
				<div>
					<Link href="/" className="text-black font-semibold text-xl">
						LinkWrap
					</Link>
				</div>
				<div className="flex flex-row items-center space-x-4">
					{/* <Link
						href="/"
						className={`relative z-10 flex items-center p-2 text-sm transition duration-200 text-gray-600 border border-transparent rounded-md dark:focus:ring-opacity-40 focus:outline-none`}
					>
						Home
					</Link>
					<Link
						href="/history"
						className={`relative z-10 flex items-center p-2 text-sm transition duration-200 text-gray-600 border border-transparent rounded-md dark:focus:ring-opacity-40 focus:outline-none`}
					>
						History
					</Link> */}
					<Link
						href="https://github.com/k8pai/linkwrap"
						className={`relative z-10 flex items-center p-2 text-sm transition duration-200 text-gray-600 hover:text-gray-800 border border-transparent rounded-md dark:focus:ring-opacity-40 focus:outline-none`}
						target="_blank"
					>
						<SiGithub className={`w-5 h-5`} />
					</Link>
					<div>
						{session?.user?.email ? (
							<UserDropdown user={session?.user} />
						) : (
							<SignIn />
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
