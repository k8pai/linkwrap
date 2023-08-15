'use server';

import { revalidatePath } from 'next/cache';
import { getLinks, setLinks } from '@/lib/links';

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
