'use server';

import { revalidatePath } from 'next/cache';
import { deleteLink, getLinks, setLinks } from '@/lib/links';
import { Links } from '@prisma/client';

export type options = {
	link: string;
	email: string;
	created_at: Date;
};

export const AddLinks = async (options: options) => {
	await setLinks(options);
	revalidatePath('/');
};

export const GetLinks = async () => {
	await getLinks();
	revalidatePath('/');
};

export const refreshLinks = async () => {
	await getLinks();
	revalidatePath('/');
};

export const DeleteLink = async (_id: string) => {
	await deleteLink(_id);
};
