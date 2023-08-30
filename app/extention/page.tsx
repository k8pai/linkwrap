'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { FiCopy, FiLink } from 'react-icons/fi';
import { Links } from '@prisma/client';
import { fetchExt, fetchLink } from '@/lib/swr';
import useSWR from 'swr';
import { error } from 'console';
import Link from 'next/link';

const page = () => {
	// const [saved, setSaved] = useState<string[]>([
	// 	'cristiano',
	// 	'messi',
	// 	'neymar',
	// 	'mbappe',
	// 	'haaland',
	// ]);
	const [currLink, setCurrLink] = useState<string>('https://example.com');
	const {
		data: saved,
		error: isError,
		mutate,
		isLoading,
	} = useSWR<Links[], Error>('/extLinks', fetchExt);

	return (
		<div className="flex-1 flex flex-col lg:flex-row lg:justify-evenly p-10 h-full w-full">
			<div className="flex-grow flex flex-col items-start">
				<h1 className="p-4 text-xl font-bold tracking-wide">
					All saved links
				</h1>
				<div className="flex flex-col px-4 mt-2">
					{isError && <div>failed to load links!!!</div>}
					{saved &&
						saved?.map((el, elXid) => (
							<div className="w-fit" key={elXid}>
								<button
									onClick={() => setCurrLink(el.link)}
									className="group w-fit flex items-start text-left space-x-2 font-mono text-sm mt-2 hover:text-cyan-600"
								>
									<span>
										{elXid < 9
											? `0${elXid + 1}`
											: elXid + 1}
										)
									</span>
									<span>{el.link}</span>
								</button>
								<hr />
							</div>
						))}
				</div>
			</div>
			<div className="flex-1 flex flex-col justify-center items-center min-h-[192px] h-full max-w-xl w-full">
				<h1 className="font-semibold text-lg text-center capitalize tracking-wider p-4 mb-4">
					QR Code
				</h1>
				<div className="flex justify-center items-center w-48 h-48">
					{currLink ? (
						<QRCode
							value={currLink}
							renderAs="canvas"
							style={{
								height: 192,
								width: 192,
								margin: '20px',
							}}
						/>
					) : (
						<span className="font-semibold capitalize tracking-wider">
							Click on a link...
						</span>
					)}
				</div>
				{currLink && (
					<div className="mt-4 p-2">
						<button
							className="group w-fit flex items-center text-left space-x-2 mt-2 hover:text-cyan-600"
							onClick={() =>
								navigator.clipboard.writeText(currLink)
							}
						>
							<span>Copy Link</span>
							<FiCopy className={`transition duration-150`} />
						</button>
						<Link
							className="group w-fit flex items-center text-left space-x-2 mt-2 hover:text-cyan-600"
							href={currLink ?? 'https://example.com'}
						>
							<span>Visit Link</span>
							<FiLink />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default page;
