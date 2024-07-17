import { DynamicData } from './DynamicData';

export interface StatisticCardProps {
	title: string;
	totalAmount: string;
	minAmount?: string;
	numberOfItems: number;
	color: string;
}

export type percentCardTypes = {
	variants: DynamicData;
	percentage: string;
	color: string;
};

type chartTypes = {
	month: string;
	approvals: number;
	rejected: number;
};

export interface ChartDataTypes {
	chartData: chartTypes[];
}

export type statisticData = {
	totalProducts: number;
	allProductsValue: number;
	numberOfExpiredProducts: number;
	loss: number;
	currentProductsValue: number;
	totalRemainingProducts: number;
};

export type statisticsState = {
	isLoading: boolean;
	data: statisticData | null;
	error: string | null;
	lossPercent: number;
	expiredProductPercent: number;
};

export interface Stats {
	TAMOUNT_APPROVALS: number;
	TAMOUNT_REJECTED: number;
	TAMOUNT_PENDING: number;
	TAMOUNT_SALES: number;
	NUMBER_PENDING: number;
	NUMBER_SALES: number;
}
