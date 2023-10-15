import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Links } from '@prisma/client';
import NextTable from './NextTable';

export const fetchLinks = async (
	email: string | null | undefined,
): Promise<Links[]> => {
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/saved`, {
		method: 'POST',
		body: JSON.stringify({ email }),
		next: { revalidate: 1, tags: ['saved'] },
	});
	const response = await res.json();

	return response;
};

export const dynamic = 'force-dynamic';

const page = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	const links = await fetchLinks(session?.user?.email);

	return (
		<div className="flex-1 flex flex-col lg:flex-row lg:justify-evenly p-10 h-full w-full">
			<div className="flex-1 flex flex-col items-start">
				<h1 className="p-4 text-xl font-bold tracking-wide">
					All saved links
				</h1>

				<NextTable links={links} />
			</div>
		</div>
	);
};

export default page;
