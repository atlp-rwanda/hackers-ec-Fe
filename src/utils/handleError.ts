export const checkServerConnection = async (): Promise<boolean> => {
	const port = process.env.PORT || 5173;
	try {
		const response = await fetch(`http://localhost:${port}/`);
		if (response.status !== 200) return false;
		return true;
	} catch (error) {
		return false;
	}
};
