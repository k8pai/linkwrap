import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import NextTable from './NextTable';
import { getLinks } from '@/lib/links';

export const dynamic = 'force-dynamic';

const page = async () => {
	// const session = await getServerSession(authOptions);

	// if (!session) {
	// 	redirect('/');
	// }

	const { data: links, error, loginError: fallback } = await getLinks();

	return (
		<div className="flex-1 flex flex-col lg:flex-row lg:justify-evenly p-10 h-full w-full">
			<div className="flex-1 flex flex-col items-start">
				<h1 className="p-4 text-xl font-bold tracking-wide">
					All saved links
				</h1>

				<NextTable
					links={links || []}
					fallback={!links && fallback ? fallback : 'No Saved links'}
				/>
			</div>
		</div>
	);
};

export default page;
