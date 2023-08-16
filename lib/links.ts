import prisma from '@/prisma';
import { Links } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { options } from '@/app/actions';

export const setLinks = async (data: options) => {
	try {
		const response = await prisma.links.create({ data });
		return { data: response };
	} catch (error) {
		return { error };
	}
};

export const getLinks = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) {
			return { loginError: 'Login to see Recent links.' };
		}
		const { email } = session.user;

		const data: Links[] = await prisma.links.findMany({ where: { email } });
		return { data: data.reverse() };
	} catch (error) {
		return { error };
	}
};
