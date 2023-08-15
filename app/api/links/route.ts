import prisma from '@/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { Links } from '@prisma/client';

export async function GET(request: Request) {
	console.log('inside api route');
	try {
		const session = await getServerSession(authOptions);
		console.log('session => ', session);
		if (!session?.user?.email) {
			return NextResponse.json({ loginError: 'not logged in' });
		}
		const { email } = session.user;

		const data: Links[] = await prisma.links.findMany({ where: { email } });
		const response = data.reverse();
		console.log('data => ');

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(error);
	}
}
