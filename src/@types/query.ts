import { DynamicData } from './DynamicData';

export interface QueryState {
	isLoading: boolean;
	singleQuery: DynamicData;
	error: string | null;
	querries: DynamicData;
}
