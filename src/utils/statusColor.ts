const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case 'canceled':
			return 'text-action-error font-medium';
		case 'delivered':
			return 'text-action-success font-bold';
		case 'pending':
		default:
			return 'text-neutral-black font-medium';
	}
};

export default getStatusColor;
