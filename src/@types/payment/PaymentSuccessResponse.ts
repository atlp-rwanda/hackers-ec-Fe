type SaleProduct = {
	name: string;
	price: number;
	images: string[];
	isAvailable: boolean;
};

type Sale = {
	orderId: string;
	status: string;
	deliveryDate: string;
	quantitySold: number;
	soldProducts: SaleProduct;
};

type Order = {
	id: string;
	buyerId: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	sales: Sale[];
};

type PaymentSuccessResponse = {
	data: {
		order: Order;
	};
};

export default PaymentSuccessResponse;
