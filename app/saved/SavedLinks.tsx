'use client';

import { Notifier } from '@/components/actions';
import { timestampToTime } from '@/lib/helpers';
import { Links } from '@prisma/client';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

type props = {
	props: Links;
};

const SavedLinks = ({ props: { id, link, created_at } }: props) => {
	const [notification, setNotification] = useState<boolean>(false);

	const trigger = () => {
		console.log('inside notification trigger');
		if (!notification) {
			setNotification(true);
			setTimeout(() => {
				setNotification(false);
			}, 1000);
		}
	};

	const changeCurrLink = () => {
		trigger();
		navigator.clipboard.writeText(link);
	};
	return (
		<div className="w-full flex selection:bg-gray-500/30 mt-2 p-1 shadow-md border border-zinc-700/30 rounded-md ">
			<div className="p-1 flex-1 overflow-hidden">
				<p className="leading-tight overflow-hidden whitespace-nowrap">
					{link}
				</p>
				<time className="text-sm leading-tight whitespace-nowrap">
					{timestampToTime(created_at)}
				</time>
			</div>
			<button
				onClick={changeCurrLink}
				className="group ml-3 inset-0 font-mono p-1.5"
			>
				<FiCopy
					className={` transition duration-150 opacity-50 group-hover:opacity-100`}
				/>
			</button>
			<Notifier notification={notification} />
		</div>
	);
};

export default SavedLinks;
