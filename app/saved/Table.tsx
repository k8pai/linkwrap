'use client';

import { Notifier } from '@/components/actions';
import { timestampToTime } from '@/lib/helpers';
import { Links } from '@prisma/client';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { MdDelete, MdKeyboardArrowUp, MdShare } from 'react-icons/md';
import { DeleteLink } from '../actions';
import useSWR from 'swr';
import { fetchLink } from '@/lib/swr';
import Options from './Options';

const Table = ({ email }: { email: string }) => {
	const [notification, setNotification] = useState<boolean>(false);
	const {
		data: saved,
		error: isError,
		mutate,
	} = useSWR<Links[], Error>('/savedLinks', fetchLink);

	const deleteSavedList = async (id: string) => {
		console.log('deleting list with id => ', id);
		await DeleteLink(id);
		mutate();
	};

	const sortLinks = () => {
		console.log('sort function called');
		saved?.map((el) => console.log(el.link));
		let links = saved?.reverse();
		links?.map((el) => console.log(el.link));
	};

	const copyToClipboard = (link: string) => {
		navigator.clipboard.writeText(link);
		trigger();
	};

	const trigger = () => {
		if (!notification) {
			setNotification(true);
			setTimeout(() => {
				setNotification(false);
			}, 1000);
		}
	};

	const handleShareClick = (item: string) => {
		// const encodedItem = encodeURIComponent(item);

		const additionalText = '*Hey, check out this awesome link!*';
		const whatsappMessage = `${additionalText} \n\n${item}`;
		const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
			whatsappMessage,
		)}`;
		window.location.href = whatsappLink;
	};
	return (
		<div>
			<div className="max-w-full w-full shadow-md sm:rounded-md">
				<table className="w-full text-sm text-left text-zinc-500 shadow-md">
					<thead className="text-xs text-zinc-700 uppercase">
						<tr>
							<th scope="col" className="px-6 py-3">
								Link
							</th>
							<th scope="col" className="px-6 py-3">
								<div className="flex items-center">
									Timestamp
									<button onClick={() => sortLinks()}>
										<MdKeyboardArrowUp />
									</button>
								</div>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">copy</span>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{saved &&
							saved?.map(({ link, created_at, id }, _) => (
								<tr key={id} className="border-b">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-zinc-700 whitespace-nowrap"
									>
										{link}
									</th>
									<td className="px-6 py-4">
										{timestampToTime(created_at)}
									</td>
									<td className="px-6 py-4 text-right">
										<button
											type="button"
											onClick={() =>
												copyToClipboard(link)
											}
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											<FiCopy />
										</button>
									</td>
									<td className="px-6 py-4 text-right">
										<button
											type="button"
											onClick={() => deleteSavedList(id)}
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											<MdDelete />
										</button>
									</td>
									<td className="px-6 py-4 text-right">
										<button
											type="button"
											onClick={() =>
												handleShareClick(link)
											}
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											<MdShare />
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<Notifier notification={notification} />
			</div>
		</div>
	);
};

export default Table;
