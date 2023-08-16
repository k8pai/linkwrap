'use client';

import { fetchLocalLinks } from '@/lib/locallinks';
import React, { useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import useSWR from 'swr';
import LinkComponent from './LinkComponent';

const RecentLinks = () => {
	// const { links, isError, isLoading } = useLinks();
	const { data, error, isLoading, mutate } = useSWR<string[], Error>(
		'/locallinks',
		fetchLocalLinks,
	);

	// console.log('links => ', links);
	// console.log('isError => ', isError);
	// console.log('isLoading => ', isLoading);

	// if (links) {
	// 	console.log('data got from lib/getLinks function => ', links);
	// }

	// const copyToClipboard = (el: string) => {
	// 	// setState(el);
	// 	navigator.clipboard.writeText(el);
	// };
	return (
		<div className="mt-6 p-2">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold capitalize trakcing-wider">
					recent links
				</h1>
				<BiRefresh />
			</div>
			<div className="mt-4 max-w-fit w-full">
				{data ? (
					data?.map((el, _) => <LinkComponent key={_} link={el} />)
				) : isLoading ? (
					<span>Loading...</span>
				) : (
					<span>No recent links</span>
				)}
				{/* <LocalLinks /> */}
				{/* {isError && (
					<div className="group w-fit flex items-center space-x-2 font-mono text-sm mt-2 hover:text-cyan-600">
						<span>Failed to fetch</span>
					</div>
				)} */}
				{/* {isLoading && (
					<div className="group w-fit flex items-center space-x-2 font-mono text-sm mt-2 hover:text-cyan-600">
						<span>fetching saved links...</span>
					</div>
				)} */}
				{/* {links &&
					links
						.slice(0, 5)
						.map(({ id, email, link, created_at }, _) => (
							<LinkComponent key={id} link={link} />
						))} */}
			</div>
		</div>
	);
};

export default RecentLinks;
