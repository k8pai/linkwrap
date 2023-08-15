'use client';

import React from 'react';
import { useFormContext } from './FormProvider';
import QRCode from 'qrcode.react';

const QRcode = () => {
	const { state } = useFormContext();
	return (
		<div>
			<h1 className="font-semibold text-lg capitalize tracking-wider p-2 mb-4">
				Scan Your QR Code
			</h1>
			<div className="flex justify-center items-center w-48 h-48">
				{state ? (
					<QRCode
						value={state}
						renderAs="canvas"
						style={{
							height: 192,
							width: 192,
							margin: '20px',
						}}
					/>
				) : (
					<span className="font-semibold capitalize tracking-wider">
						Type a link...
					</span>
				)}
			</div>
		</div>
	);
};

export default QRcode;
