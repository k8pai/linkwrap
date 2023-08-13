import React from 'react';

const Footer = () => {
	return (
		<footer className="p-6 text-center">
			<p className="text-gray-600">
				&copy; {new Date().getFullYear()} LinkWrap. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
