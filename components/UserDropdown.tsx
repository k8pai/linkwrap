'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SignOut } from './actions';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import type { Session } from 'next-auth';

type props = {
	user: Session['user'];
};

const UserDropdown = ({ user }: props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleMenu = () => setIsOpen((val) => !val);

	return (
		<div className="flex justify-center">
			<div className="relative inline-block">
				<button
					onClick={toggleMenu}
					className={`relative z-10 flex items-center p-2 text-sm transition duration-200 text-gray-600 border ${
						isOpen ? 'border-zinc-800/80' : 'border-zinc-800/30'
					} rounded-md focus:outline-none`}
				>
					<span className="mx-1">Account</span>
					<MdOutlineKeyboardArrowDown
						className={`transition duration-150 ${
							isOpen ? 'rotate-180' : 'rotate-0'
						}`}
					/>
				</button>

				{isOpen && (
					<div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
						<Link
							href="/"
							onClick={toggleMenu}
							className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform"
						>
							<Image
								className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
								src={user?.image!}
								alt={`${user?.name!} Avatar`}
								width={30}
								height={30}
							/>
							<div className="mx-1">
								<h1 className="text-sm font-semibold text-gray-700">
									{user?.name}
								</h1>
								<p className="text-sm text-gray-500">
									{user?.email}
								</p>
							</div>
						</Link>

						<hr className="border-gray-200" />

						<Link
							href="/history"
							onClick={toggleMenu}
							className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100 "
						>
							Saved Links
						</Link>

						<Link
							href="#"
							onClick={toggleMenu}
							className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100 "
						>
							Keyboard shortcuts
						</Link>

						<hr className="border-gray-200" />

						<SignOut className="block w-full text-left px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100 " />
						{/* <a href="#">Sign Out</a> */}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserDropdown;
