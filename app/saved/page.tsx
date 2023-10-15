import { getLinks } from '@/lib/links';
import React from 'react';
import SavedLinks from './SavedLinks';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { timestampToTime } from '@/lib/helpers';
import Table from './Table';
import { Links } from '@prisma/client';
import useSWR from 'swr';
import NextTable from './NextTable';
import { fetchLink } from '@/lib/swr';

export const fetchLinks = async (
	email: string | null | undefined,
): Promise<Links[]> => {
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/saved`, {
		method: 'POST',
		body: JSON.stringify({ email }),
	});
	const response = await res.json();

	return response;
};

const page = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	// const { data: saved, error, loginError } = await getLinks();
	const links = await fetchLinks(session?.user?.email);

	return (
		<div className="flex-1 flex flex-col lg:flex-row lg:justify-evenly p-10 h-full w-full">
			<div className="flex-1 flex flex-col items-start">
				<h1 className="p-4 text-xl font-bold tracking-wide">
					All saved links
				</h1>

				{/* <Table email={session?.user?.email!} /> */}
				<NextTable links={links} />

				{/* <div className="max-w-full w-fit flex flex-col px-4 mt-2">
					{saved &&
						saved?.map((el, elXid) => (
							<SavedLinks key={el.id} props={el} />
						))}
				</div> */}
				{/* <table className="table-auto border-collapse border border-slate-500">
					<thead>
						<tr className="text-left">
							<th>Link</th>
							<th>created_at</th>
							<th>Copy</th>
							<th>delete</th>
						</tr>
					</thead>
					<tbody>
						{saved &&
							saved?.map(
								({ id, link, created_at, email }, elXid) => (
									<tr
										key={id}
										className={`p-2 ${
											elXid % 2
												? 'bg-neutral-100'
												: 'bg-neutral-200'
										}`}
									>
										<td>{link}</td>
										<td>{timestampToTime(created_at)}</td>
										<td>copy</td>
										<td>delete</td>
									</tr>
								),
							)}
					</tbody>
				</table> */}
			</div>
			{/* <div>
			</div> */}
			{/* <div className="flex-1 flex justify-center items-center min-h-[192px] h-full w-48">
				{currLink ? (
					<QRCode
						value={currLink}
						renderAs="canvas"
						style={{
							height: 192,
							width: 192,
						}}
					/>
				) : (
					<span className="font-semibold capitalize tracking-wider">
						Select a link to show QRCode
					</span>
				)}
			</div> */}
		</div>
	);
};

export default page;
