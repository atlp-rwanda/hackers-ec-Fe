export const getStatusClass = (status: string) => {
	switch (status.toLowerCase()) {
		case 'canceled':
			return 'text-red-500';
		case 'delivered':
			return 'text-green-500';
		case 'pending':
		default:
			return 'text-black';
	}
};
