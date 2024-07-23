import { createContext, useContext } from 'react';
import { DynamicData } from '../@types/DynamicData';
export const ThemeContext = createContext<DynamicData>([]);

export function useWishcontext() {
	const wishes = useContext(ThemeContext);
	return { wishes };
}
