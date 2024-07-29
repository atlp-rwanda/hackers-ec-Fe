import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import WishTable from '../../../../components/wishes/Seller/WishlistTable';
import { getSellerWishlist } from '../../../../redux/features/sellerWishlistSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';

const WishlistPage = () => {
	const dispatch = useAppDispatch();
	const { isLoading, wishlist } = useAppSelector((state) => state.sellerWishes);

	useEffect(() => {
		dispatch(getSellerWishlist()).unwrap();
	}, [dispatch]);

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 10;
	const pageCount = Math.ceil(wishlist.length / itemsPerPage);

	const offset = currentPage * itemsPerPage;
	const wishes = wishlist.slice(offset, offset + itemsPerPage);

	const handlePageChange = (event: { selected: number }) => {
		setCurrentPage(event.selected);
	};

	return (
		<div className="parent_container relative max-h-[80%] overflow-y-scroll overflow-hidden pb-4 mt-4 h-full">
			{isLoading ? (
				<div className="w-full h-full flex items-center justify-center">
					<HashLoader
						color="#256490"
						role="progressbar"
						aria-label="single_product_loader"
					/>
				</div>
			) : wishlist.length === 0 ? (
				<div className="w-full h-[90%] flex items-center justify-center ">
					<h2 className="text-center font-bold text-2xl">
						Your product hasn't been added to any wishlists yet.
					</h2>
				</div>
			) : (
				<WishTable
					wishes={wishes}
					pageCount={pageCount}
					handlePageChange={handlePageChange}
				/>
			)}
		</div>
	);
};

export default WishlistPage;
