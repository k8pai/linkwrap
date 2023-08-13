'use client';

import Image from 'next/image';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { MdOutlineClear } from 'react-icons/md';
import Link from 'next/link';

export default function Home() {
	const [state, setState] = useState<string>('');
	const [recentLinks, setRecentLinks] = useState<string[]>([
		'cristiano',
		'messi',
		'neymar',
		'mbappe',
		'haaland',
	]);

	const copyToClipboard = (el: string) => {
		setState(el);
		navigator.clipboard.writeText(el);
	};

	return (
		<div className="flex-1 flex flex-col lg:flex-row  justify-evenly items-start p-10 h-full w-full">
			<div>
				<div className="flex justify-center items-center">
					<div className="relative">
						<input
							className={`pl-4 pr-12 py-3 rounded-md shadow-xl transition duration-150 border border-neutral-700/30 outline-none focus:border-neutral-700/80 min-w-[300px] lg:min-w-[450px] max-w-xl w-full h-full mx-auto`}
							type="text"
							value={state}
							onChange={(e) => setState(e.target.value)}
							placeholder="Enter your link"
						/>
						<button
							type="submit"
							onClick={() =>
								setRecentLinks((el) => [state, ...el])
							}
							className={`absolute inset-y-0 right-0 mx-3`}
						>
							<BsBookmark />
						</button>
					</div>
					{/* <button
						type="button"
						className="mx-2 p-3 transition duration-150 rounded-md "
						onClick={() => setState('')}
					>
						<MdOutlineClear />
					</button> */}
				</div>
				<div className="mt-6 p-2">
					<h1 className="font-semibold capitalize trakcing-wider">
						recent links
					</h1>
					<div className="mt-4">
						{recentLinks.slice(0, 5).map((el, elXid) => (
							<div
								key={elXid}
								className="group w-fit flex items-center space-x-2 font-mono text-sm mt-2 hover:text-cyan-600"
							>
								<span>{el}</span>
								<button
									onClick={() => copyToClipboard(el)}
									className={`transition duration-150 opacity-0 group-hover:opacity-100`}
								>
									<FiCopy />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex justify-center items-center h-48 w-48">
				{state ? (
					<QRCode
						value={state}
						renderAs="canvas"
						style={{
							height: 192,
							width: 192,
						}}
					/>
				) : (
					<span className="font-semibold capitalize tracking-wider">
						Type a link...
					</span>
				)}
			</div>
		</div>
	);
}
