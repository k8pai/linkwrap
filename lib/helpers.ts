export const timestampToTime = (timestamp: Date): string => {
	let day, time;
	let date = new Date(timestamp);
	day = date.toLocaleDateString([], {
		day: 'numeric',
		month: 'short',
	});
	time = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

	let result = `${day}, ${time.toUpperCase()}`;
	return result;
};

import { Links } from '@prisma/client';
import { format } from 'date-fns';

export const getTimeHelper = (timestamp: Date): string => {
	let datestamp = new Date(timestamp);

	let date = format(datestamp, 'dd LLL');
	let time = format(datestamp, 'hh:mm aaa');
	return `${date}, ${time.toUpperCase()}`;
};

export const fetchLinks = async (
	email: string | null | undefined,
): Promise<Links[]> => {
	const res = await fetch(`/api/saved`, {
		method: 'POST',
		body: JSON.stringify({ email }),
		next: { revalidate: 1, tags: ['saved'] },
	});
	const response = await res.json();

	return response;
};
