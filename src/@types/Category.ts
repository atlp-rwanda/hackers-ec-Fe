import { categorySchemaType } from '../validations/categories/category.validation';
import { DynamicData } from './DynamicData';

export interface CategoryState {
	isLoading: boolean;
	categories: DynamicData[];
	error: string | null;
	isCategoryModelOpen: boolean;
}

export type CategoriesFormProps = {
	categoryData?: categorySchemaType | null;
	onClose: () => void;
};
