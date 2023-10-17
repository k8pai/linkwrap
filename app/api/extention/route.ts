import prisma from '@/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { Links } from '@prisma/client';

export async function GET(request: Request) {
	// console.log('getting something.... ');
	try {
		// console.log('email from delete api => ');
		// const { email } = await request.json();
		const session = await getServerSession(authOptions);

		// console.log('session => ', session);
		if (!session?.user?.email) {
			return NextResponse.json({ loginError: 'not logged in' });
		}
		const { email } = session.user;

		const data: Links[] = await prisma.links.findMany({ where: { email } });
		const response = data.reverse();
		// console.log('data from api/extention => ', response);

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function POST(request: Request) {
	console.log('doing something inside post request...');
	try {
		const { email, link, title, icon } = await request.json();

		// const session = await getServerSession(authOptions);
		console.log(
			'request.json() from extention/route.ts => ',
			email,
			icon,
			link,
			title,
		);
		// if (!session?.user?.email) {
		// 	return NextResponse.json({ loginError: 'not logged in' });
		// }
		// const { email } = session.user;

		const data = {
			email,
			link,
			icon,
			title,
			created_at: new Date(),
		};

		const response: Links = await prisma.links.create({ data });
		// const response = res;
		console.log('data => ', response);

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function DELETE(request: Request) {
	console.log('inside delete api');
	try {
		const { id } = await request.json();
		const deletedItem: Links = await prisma.links.delete({
			where: { id: id },
		});
		return NextResponse.json(deletedItem);
	} catch (error) {
		return NextResponse.json(error);
	}
}
