'use server';

import { revalidatePath } from 'next/cache';
import { getLinks, setLinks } from '@/lib/links';

export const AddLinks = async (options) => {
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
