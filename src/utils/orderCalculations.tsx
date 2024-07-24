import { DynamicData } from '../@types/DynamicData';

export const calculateTotalPrice = (sales: DynamicData[]): number => {
	return sales.reduce((acc: number, sale: DynamicData) => {
		return acc + sale.soldProducts?.price * sale.quantitySold;
	}, 0);
};

export const calculateTotalQuantity = (sales: DynamicData[]): number => {
	return sales.reduce((acc: number, sale: DynamicData) => {
		return acc + sale.quantitySold;
	}, 0);
};
