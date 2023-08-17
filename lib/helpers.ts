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
