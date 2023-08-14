'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import prisma from '@/prisma';
import { revalidatePath } from 'next/cache';

export const AddLinks = async (formdata: FormData) => {
	const { state: link } = Object.fromEntries(formdata);
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		console.log('user is not registered => ');
		return;
	}
	const { email } = session.user;
	console.log('mail => ', email);

	const data = {
		link: link as string,
		email,
		created_at: new Date(),
	};

	const response = await prisma.links.create({ data });
	console.log('response => ', response);
	revalidatePath('/');
};

export const GetLinks = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) {
			console.log('user is not registered => ');
			return {};
		}
		const { email } = session.user;
		const data = await prisma.links.findMany({ where: { email } });
		console.log('data => ', data);
		return { data };
	} catch (error) {
		console.error('Error from GetLinks catch => ', error);
		return { error };
	}
};
