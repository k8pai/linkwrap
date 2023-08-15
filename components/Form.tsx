'use client';

import { AddLinks } from '@/app/actions';
import React, { useRef, useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import { useFormContext } from './FormProvider';

const Form = ({ email }: { email: string }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const { state, setState } = useFormContext();
	// const [input, setInput] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState(e.target.value);
	};

	const handleSubmit = (formData: FormData) => {
		const { link } = Object.fromEntries(formData);

		const options = {
			link: link as string,
			email,
			created_at: new Date(),
		};

		AddLinks(options);
		setState('');
	};
	return (
		<div className="flex justify-center items-center">
			<form ref={formRef} action={handleSubmit} className="relative">
				<input
					className={`pl-4 pr-12 py-3 rounded-md shadow-xl transition duration-150 border border-neutral-700/30 outline-none focus:border-neutral-700/80 min-w-[300px] lg:min-w-[450px] max-w-xl w-full h-full mx-auto`}
					type="text"
					name="link"
					value={state}
					onChange={handleInputChange}
					placeholder="Enter your link"
				/>
				<button
					type="submit"
					className={`absolute inset-y-0 right-0 mx-3`}
				>
					<BsBookmark />
				</button>
			</form>
		</div>
	);
};

export default Form;
