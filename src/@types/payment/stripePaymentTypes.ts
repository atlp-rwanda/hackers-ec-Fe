export type stripeState = {
	isLoading: boolean;
	data: CheckoutSessionResponse | null;
	error: string | null;
};
export type CheckoutSessionResponse = {
	status: string;
	message: string;
	data: {
		sessionUrl: string;
	};
};
