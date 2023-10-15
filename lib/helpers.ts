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

import { format } from 'date-fns';

export const getTimeHelper = (timestamp: Date): string => {
	let datestamp = new Date(timestamp);

	let date = format(datestamp, 'dd LLL');
	let time = format(datestamp, 'hh:mm aaa');
	return `${date}, ${time.toUpperCase()}`;
};
