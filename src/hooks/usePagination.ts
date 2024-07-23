import { useEffect, useState } from 'react';
import useWish from './useWishlist';
const usePagination = () => {
	const { data, isLoading } = useWish();
	const [currentPage, setCurrentPage] = useState(0);
	useEffect(() => {
		setCurrentPage(0);
	}, [data]);

	if (data) {
		const itemsPerPage = 3;
		const offset = currentPage * itemsPerPage;
		const currentItems = data.slice(offset, offset + itemsPerPage);
		let pageCount = 0;
		if (data) {
			pageCount = Math.ceil(data?.length / itemsPerPage);
		}
		const handlePageClick = (event: { selected: number }) => {
			setCurrentPage(event.selected);
		};
		return { currentItems, pageCount, handlePageClick, isLoading };
	}
};
export default usePagination;
