'use client';

import { Links } from '@prisma/client';
import React from 'react';
import { FiCopy } from 'react-icons/fi';

type props = {
	props: Links;
};

const SavedLinks = ({ props: { id, link } }: props) => {
	const changeCurrLink = () => {
		navigator.clipboard.writeText(link);
	};
	return (
		<button
			onClick={changeCurrLink}
			className="group w-fit flex items-center space-x-2 font-mono text-sm mt-2 hover:text-cyan-600"
		>
			<span>{link}</span>
			<FiCopy
				className={`transition duration-150 opacity-0 group-hover:opacity-100`}
			/>
		</button>
	);
};

export default SavedLinks;
