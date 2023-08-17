'use client';

import { Notifier } from '@/components/actions';
import { timestampToTime } from '@/lib/helpers';
import { Links } from '@prisma/client';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { MdDelete, MdKeyboardArrowUp } from 'react-icons/md';
import { DeleteLink } from '../actions';
import useSWR from 'swr';
import { deleteLink } from '@/lib/links';
import { deleteLinkAPI, fetchLink, getLinkAPI } from '@/lib/swr';

const Table = ({ email }: { email: string }) => {
	const [notification, setNotification] = useState<boolean>(false);
	const {
		data: saved,
		error: isError,
		mutate,
	} = useSWR<Links[], Error>('/savedLinks', fetchLink);

	console.log('saved => ', saved);
	const deleteSavedList = async (id: string) => {
		//delete link from database where id = ${id}
		console.log('deleting list with id => ', id);
		await DeleteLink(id);
		mutate();
		// await mutate(DeleteLink(id), {
		// 	optimisticData: [...saved?.filter((el) => el.id !== id)!],
		// });
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
	return (
		<div>
			<div className="overflow-x-auto max-w-full w-full shadow-md sm:rounded-md">
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
						</tr>
					</thead>
					<tbody>
						{saved &&
							saved?.map(({ link, created_at, id }, _) => (
								<tr key={id} className="bg-emerald-50 border-b">
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
