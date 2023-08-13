'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { FiCopy } from 'react-icons/fi';

const page = () => {
	const [saved, setSaved] = useState<string[]>([
		'cristiano',
		'messi',
		'neymar',
		'mbappe',
		'haaland',
	]);
	const [currLink, setCurrLink] = useState<string>('');

	const changeCurrLink = (el: string) => {
		navigator.clipboard.writeText(el);
		setCurrLink(el);
	};

	return (
		<div className="flex-1 flex flex-col lg:flex-row lg:justify-evenly p-10 h-full w-full">
			<div className="flex-1 flex flex-col items-start">
				<h1 className="p-4 text-xl font-bold tracking-wide">
					All saved links
				</h1>
				<div className="flex flex-col px-4 mt-2">
					{saved.map((el, elXid) => (
						<button
							key={elXid}
							onClick={() => changeCurrLink(el)}
							className="group w-fit flex items-center space-x-2 font-mono text-sm mt-2 hover:text-cyan-600"
						>
							<span>{el}</span>
							<FiCopy
								className={`transition duration-150 opacity-0 group-hover:opacity-100`}
							/>
						</button>
					))}
				</div>
			</div>
			<div className="flex-1 flex justify-center items-center min-h-[192px] h-full w-48">
				{currLink ? (
					<QRCode
						value={currLink}
						renderAs="canvas"
						style={{
							height: 192,
							width: 192,
						}}
					/>
				) : (
					<span className="font-semibold capitalize tracking-wider">
						Select a link to show QRCode
					</span>
				)}
			</div>
		</div>
	);
};

export default page;
