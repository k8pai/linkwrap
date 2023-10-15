'use client';

import React, { useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	User,
	Chip,
} from '@nextui-org/react';
import useSWR, { mutate } from 'swr';
import { Links } from '@prisma/client';
import { fetchLink } from '@/lib/swr';
import { FiCopy } from 'react-icons/fi';
import { DeleteLink } from '../actions';
import { Notifier } from '@/components/actions';

const rows = [
	{
		key: '1',
		name: 'Tony Reichert',
		role: 'CEO',
		status: 'Active',
	},
	{
		key: '2',
		name: 'Zoey Lang',
		role: 'Technical Lead',
		status: 'Paused',
	},
	{
		key: '3',
		name: 'Jane Fisher',
		role: 'Senior Developer',
		status: 'Active',
	},
	{
		key: '4',
		name: 'William Howard',
		role: 'Community Manager',
		status: 'Vacation',
	},
];

const columns = [
	{
		key: 'link',
		label: 'Link',
	},
	{
		key: 'created_at',
		label: 'Timestamp',
	},
	{
		key: 'copy',
		label: 'Copy',
	},
];

export default function NextTable({ links }: { links: Links[] }) {
	const [notification, setNotification] = useState<boolean>(false);

	const copyToClipboard = (link: string) => {
		console.log('link => ', link);
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

	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey];
		console.log('cellvalue => ', cellValue);
		switch (columnKey) {
			case 'name':
				return (
					<User
						avatarProps={{ radius: 'lg', src: user.avatar }}
						description={user.email}
						name={cellValue}
					>
						{user.email}
					</User>
				);
			case 'role':
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">
							{cellValue}
						</p>
						<p className="text-bold text-sm capitalize text-default-400">
							{user.team}
						</p>
					</div>
				);

			case 'copy':
				return (
					<button
						type="button"
						onClick={() => copyToClipboard(user.link)}
						className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
					>
						<FiCopy />
					</button>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<div className="container w-full mx-auto">
			<Table aria-label="Example table with dynamic content">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={links}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Notifier notification={notification} />
		</div>
	);
}
