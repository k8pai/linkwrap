import { GetLinks } from '@/app/actions';
import prisma from '@/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { ContextType } from 'react';

export async function GET(request: Request) {
	console.log('hitting the get request.');
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ message: 'You need to login first!' });
		}
		const { email } = session?.user!;
		const links = await prisma.links.findMany({ where: { email: email! } });
		console.log('links => ', links);
		return NextResponse.json(links);
	} catch (error) {
		console.error('Error fetching links:', error);
		return NextResponse.json({ error: 'An error occurred' });
	}
}
