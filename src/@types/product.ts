import { DynamicData } from './DynamicData';

export interface ProductState {
	isLoading: boolean;
	products: DynamicData[];
	error: string | null;
}
