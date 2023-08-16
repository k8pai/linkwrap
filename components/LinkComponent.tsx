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
		<div className="group w-fit max-w-full lg:max-w-2xl flex items-center space-x-2 transition-all py-2 px-3 border rounded-md shadow-md hover:shadow-lg font-mono text-sm mt-2">
			<span className="cursor-pointer whitespace-nowrap overflow-hidden px-1">
				{link}
			</span>
			<button onClick={() => copyToClipboard()} className={``}>
				<FiCopy
					className={'w-4 h-4 inset-0 opacity-50 hover:opacity-100'}
				/>
			</button>
			<Notifier notification={notification} />
		</div>
	);
};

export default LinkComponent;
