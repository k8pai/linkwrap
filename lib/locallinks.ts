'use client';

export const fetchLocalLinks = () => {
	return JSON.parse(localStorage.getItem('linkwrap') || '') || [];
};
