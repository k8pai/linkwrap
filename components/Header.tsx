import Link from 'next/link';
import React from 'react';
import { SiGithub } from 'react-icons/si';

const Header = () => {
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
					{/* <Link href="/about" className="text-black mr-4">
						About
					</Link> */}
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
				</div>
			</nav>
		</header>
	);
};

export default Header;
