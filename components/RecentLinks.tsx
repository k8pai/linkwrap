import React from 'react';
import { getLinks } from '@/lib/links';
import { AnimationButton } from './actions';
import LinkComponent from './LinkComponent';

const RecentLinks = async () => {
	// const { links, isError, isLoading } = useLinks();

	// console.log('links => ', links);
	// console.log('isError => ', isError);
	// console.log('isLoading => ', isLoading);

	const { data: links, error: isError, loginError } = await getLinks();
	if (isError) throw new Error(`${isError}`);

	// if (links) {
	// 	console.log('data got from lib/getLinks function => ', links);
	// }

	// const copyToClipboard = (el: string) => {
	// 	// setState(el);
	// 	navigator.clipboard.writeText(el);
	// };
	return (
		<div className="mt-6 p-2">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold capitalize trakcing-wider">
					recent links
				</h1>
				<AnimationButton />
			</div>
			<div className="mt-4">
				{/* {isError && (
					<div className="group w-fit flex items-center space-x-2 font-mono text-sm mt-2 hover:text-cyan-600">
						<span>Failed to fetch</span>
					</div>
				)} */}
				{/* {isLoading && (
					<div className="group w-fit flex items-center space-x-2 font-mono text-sm mt-2 hover:text-cyan-600">
						<span>fetching saved links...</span>
					</div>
				)} */}
				{links &&
					links
						.slice(0, 5)
						.map(({ id, email, link, created_at }, _) => (
							<LinkComponent key={id} link={link} />
						))}
			</div>
		</div>
	);
};

export default RecentLinks;
