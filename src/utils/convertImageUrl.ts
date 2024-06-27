export async function imageUrlToFile(imageUrl: string, fileName: string) {
	try {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const file = new File([blob], fileName, { type: blob.type });
		return file;
	} catch (error) {
		console.error('Error converting image:', error);
		return null;
	}
}
