import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Links } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: Request) {
	// console.log('inside api route');
	try {
		// console.log('email from delete api => ');
		const { email } = await request.json();
		// const { email } = session.user;

		const data: Links[] = await prisma.links.findMany({ where: { email } });
		const response = data.reverse();
		// console.log('data => ', response);

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function POST(request: Request) {
	try {
		// console.log('email from delete api => ');
		const { email } = await request.json();
		// const { email } = session.user;

		const data: Links[] = await prisma.links.findMany({ where: { email } });
		const response = data.reverse();
		// console.log('data => ', response);

		revalidatePath('/saved');

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { id } = await request.json();
		// console.log('id from delete api => ', id);
		const deletedItem: Links = await prisma.links.delete({
			where: { id: id },
		});
		// console.log('deletedItem => ', deletedItem);
		return NextResponse.json(deletedItem);
	} catch (error) {
		return NextResponse.json(error);
	}
}
