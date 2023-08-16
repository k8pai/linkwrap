import { getLinks } from '@/lib/links';
import React from 'react';
import SavedLinks from './SavedLinks';

const page = async () => {
	const { data: saved, error, loginError } = await getLinks();

	return (
		<div className="flex-1 flex flex-col lg:flex-row lg:justify-evenly p-10 h-full w-full">
			<div className="flex-1 flex flex-col items-start">
				<h1 className="p-4 text-xl font-bold tracking-wide">
					All saved links
				</h1>
				<div className="flex flex-col px-4 mt-2">
					{saved &&
						saved?.map((el, elXid) => (
							<SavedLinks key={el.id} props={el} />
						))}
				</div>
			</div>
			<div></div>
			{/* <div className="flex-1 flex justify-center items-center min-h-[192px] h-full w-48">
				{currLink ? (
					<QRCode
						value={currLink}
						renderAs="canvas"
						style={{
							height: 192,
							width: 192,
						}}
					/>
				) : (
					<span className="font-semibold capitalize tracking-wider">
						Select a link to show QRCode
					</span>
				)}
			</div> */}
		</div>
	);
};

export default page;
