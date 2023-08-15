'use client';

import React, {
	SetStateAction,
	createContext,
	useContext,
	useState,
	Dispatch,
} from 'react';

interface FormContextType {
	state: string;
	setState: Dispatch<SetStateAction<string>>; // Update the type here
}

const FormContext = createContext<FormContextType>({
	state: '',
	setState: () => {},
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState<string>('');

	return (
		<FormContext.Provider value={{ state, setState }}>
			{children}
		</FormContext.Provider>
	);
};

export const useFormContext = () => useContext(FormContext);
