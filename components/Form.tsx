'use client';

import { AddLinks } from '@/app/actions';
import React, { useRef, useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import { useFormContext } from './FormProvider';
import useSWR from 'swr';
import { fetchLocalLinks } from '@/lib/locallinks';

const Form = ({ email }: { email: string }) => {
	const { data, mutate } = useSWR<string[]>('/locallinks', fetchLocalLinks);
	const formRef = useRef<HTMLFormElement>(null);
	const { state, setState } = useFormContext();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState(e.target.value);
	};

	const insertLocal = (link: string) => {
		const res = JSON.parse(localStorage.getItem('linkwrap')!) || [];
		res.unshift(link);
		if (res.length > 5) res.length = 5;
		localStorage.setItem('linkwrap', JSON.stringify(res));
	};

	const handleSubmit = (formData: FormData) => {
		const { link } = Object.fromEntries(formData);
		mutate(insertLocal(link as string), {
			optimisticData: data
				? [link as string, ...data!]
				: [link as string],
		});

		setState('');
		if (!email) {
			return;
		}

		const options = {
			link: link as string,
			email,
			created_at: new Date(),
		};
		AddLinks(options);
	};
	return (
		<div className="flex w-full justify-center lg:justify-start items-center">
			<form ref={formRef} action={handleSubmit} className="relative">
				<input
					className={`pl-4 pr-12 py-3 rounded-md shadow-xl transition duration-150 border border-neutral-700/30 outline-none focus:border-neutral-700/80 lg:min-w-[450px] lg:max-w-xl w-full h-full mx-auto`}
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
