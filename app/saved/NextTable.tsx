'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
	Pagination,
	Input,
} from '@nextui-org/react';
import { Links } from '@prisma/client';
import { FiCopy } from 'react-icons/fi';
import { Notifier } from '@/components/actions';
import { SlOptionsVertical } from 'react-icons/sl';
import { MdDelete } from 'react-icons/md';
import { getTimeHelper } from '@/lib/helpers';
import { DeleteLink } from '../actions';

const columns: { key: keyof Links | 'actions'; label: string }[] = [
	{
		key: 'link',
		label: 'LINK',
	},
	{
		key: 'created_at',
		label: 'TIME',
	},
	{
		key: 'actions',
		label: 'ACTIONS',
	},
];

export default function NextTable({ links }: { links: Links[] }) {
	const [notification, setNotification] = useState<boolean>(false);
	const [filterValue, setFilterValue] = useState<string>('');
	const [page, setPage] = useState(1);
	const rowsPerPage = 10;

	const pages = Math.ceil(links.length / rowsPerPage);

	const hasSearchFilter = Boolean(filterValue);

	const filteredItems = useMemo(() => {
		let filteredUsers = [...links];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.link.toLowerCase().includes(filterValue.toLowerCase()),
			);
		}

		return filteredUsers;
	}, [links, filterValue]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems]);

	const deleteSavedList = async (id: string) => {
		await DeleteLink(id);
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

	const onSearchChange = useCallback((value: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	const renderCell = useCallback((user: Links, columnKey: any) => {
		const cellValue = user[columnKey as keyof Links];
		switch (columnKey) {
			case 'link':
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm">
							{cellValue as string}
						</p>
					</div>
				);
			case 'created_at':
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm whitespace-nowrap">
							{getTimeHelper(cellValue as Date)}
						</p>
					</div>
				);

			case 'actions':
				return (
					<div className="relative flex justify-start items-center gap-2">
						<Dropdown className="bg-background border-1 border-default-200">
							<DropdownTrigger>
								<Button
									isIconOnly
									radius="full"
									size="sm"
									variant="light"
								>
									<SlOptionsVertical className="text-default-400" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								{/* <DropdownItem>View</DropdownItem> */}
								<DropdownItem>
									<Button
										size="sm"
										variant="light"
										endContent={
											<FiCopy className="text-blue-500" />
										}
										className="text-medium w-full flex justify-between items-center"
										onClick={() =>
											copyToClipboard(user.link)
										}
									>
										Copy
									</Button>
								</DropdownItem>
								<DropdownItem>
									<Button
										size="sm"
										variant="light"
										endContent={
											<MdDelete className="fill-red-500" />
										}
										className="text-medium w-full flex justify-between items-center"
										onClick={() => deleteSavedList(user.id)}
									>
										Delete
									</Button>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
		}
	}, []);

	return (
		<div className="container w-full mx-auto">
			<Table
				aria-label="Example table with dynamic content"
				bottomContentPlacement="outside"
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							color="secondary"
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
						/>
					</div>
				}
				topContent={
					<div className=" flex flex-col items-between justify-start gap-4">
						<div className=" flex justify-between items-center ">
							<Input
								isClearable
								className="w-full sm:max-w-[44%]"
								placeholder="Search by link..."
								// startContent={<SearchIcon />}
								value={filterValue}
								onClear={() => onClear()}
								onValueChange={onSearchChange}
							/>
						</div>
						<div className="gap-3 mx-4">
							<span className="w-[30%] text-small text-default-400">
								{`Total Links: ${items.length}`}
							</span>
						</div>
					</div>
				}
				topContentPlacement="outside"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={items}>
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
