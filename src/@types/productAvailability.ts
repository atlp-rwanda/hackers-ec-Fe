export type productAvailabilityStates = {
	isLoading: boolean;
	error: string | null;
	message: string;
	availability: string;
};

export type availabilityProps = {
	id: string;
	isAvailable: boolean;
};
