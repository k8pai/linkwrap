'use client';

import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { useFormContext } from './FormProvider';
import { Notifier } from './actions';

const LinkComponent = ({ link }: { link: string }) => {
	const { state, setState } = useFormContext();
	const [notification, setNotification] = useState<boolean>(false);
	const copyToClipboard = () => {
		navigator.clipboard.writeText(link);
		setState(link);
		trigger();
	};

	const trigger = () => {
		console.log('inside notification trigger');
		if (!notification) {
			setNotification(true);
			setTimeout(() => {
				setNotification(false);
			}, 1000);
		}
	};

	return (
		<div className="group w-fit font-mono text-sm mt-2 hover:text-cyan-600">
			<button
				onClick={() => copyToClipboard()}
				className=" flex items-center space-x-2"
			>
				<span className="cursor-pointer">{link}</span>
				<FiCopy
					className={`transition duration-150 opacity-0 group-hover:opacity-100`}
				/>
			</button>
			<Notifier notification={notification} />
		</div>
	);
};

export default LinkComponent;
