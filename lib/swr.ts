export const deleteLinkAPI = (id: string) =>
	fetch('/api/saved', {
		method: 'DELETE',
		body: JSON.stringify({ id }),
	}).then((res) => res.json());

export const getLinkAPI = (email: string) =>
	fetch('/api/saved', {
		method: 'GET',
		body: JSON.stringify({ email }),
	}).then((res) => res.json());

export const fetchLink = () => fetch('/api/saved').then((res) => res.json());
export const fetchExt = () => fetch('/api/extention').then((res) => res.json());
