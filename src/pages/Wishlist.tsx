import WishListComp from '../components/wishes/WishListComp';
import usePagination from '../hooks/usePagination';
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { wishlist } from '../utils/images';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { useState } from 'react';
import BackButton from '../components/buttons/BackButton';
import { useAppSelector } from '../redux/hooks/hooks';

function Wishlist() {
	const wishes = usePagination();
	const [activeDeleteModal, setActiveDeteleModal] = useState('');
	const { isLoading } = useAppSelector((state) => state.fetchWishes);

	if (isLoading) {
		return (
			<div className="page-wrapper rel flex flex-col w-full h-full px-2 pt-[5rem] min-h-screen bimobile:px-[2rem] mobile:px-[4rem] mobile:pt-[6rem] tablet:py-[7rem] ipad:py-[8rem]">
				<div
					className="flex-1 h-full flex-center flex-col gap-4"
					data-testid="review-loader"
				>
					<HashLoader color="#266491" size={60} role="progressbar" />
					<p className="text-xs">Please wait ...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="perent_products_container bg-neutral-white min-h-screen w-full relative mt-10 mobile:mt-36  ipad:pt-[4rem]">
			{wishes?.currentItems?.length > 0 ? (
				<div className="products_container sha  ipad:rounded-md ipad:shadow ipad:w-[80%] ipad:max-w-[65rem] ipad:m-auto flex flex-col items-center laptop:items-start pl-5 w-full mt-16 laptop:gap-1">
					<div className="flex w-full pl-10 mt-6 mobile:mt-2 mobile:pl-5 ipad:pl-2 ">
						<BackButton
							isBordered
							title={'back home'}
							otherStyles="bg-primary-lightblue text-neutral-white _shadow hover:bg-primary-lightblue/85"
							url="/"
						/>
					</div>
					<h1 className="w-full text-center py-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ipad:py-0">
						Favorite Products
					</h1>

					<div className=" tablet:w-full">
						<WishListComp
							wishes={wishes?.currentItems}
							activeDeleteModal={activeDeleteModal}
							setActiveDeleteModal={setActiveDeteleModal}
						/>
					</div>
					<div className="flex items-center justify-center flex-row w-full">
						<ReactPaginate
							previousLabel={<GrPrevious />}
							nextLabel={<GrNext />}
							breakLabel={'...'}
							breakClassName={'break-me'}
							pageCount={wishes?.pageCount || 0}
							marginPagesDisplayed={2}
							pageRangeDisplayed={2}
							onPageChange={wishes?.handlePageClick}
							containerClassName={'pagination'}
							activeClassName={'active'}
						/>
					</div>
				</div>
			) : (
				<div className="products_container bg-neutral-white ipad:rounded-md ipad:shadow ipad:w-[60%] ipad:max-w-[65rem] ipad:m-auto flex flex-col items-center laptop:items-start pl-5 w-full mt-16 laptop:gap-5">
					<div
						className=" flex flex-col m-auto  items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
						role="alert"
					>
						<div className="flex items-center w-full m-auto">
							<img
								className=" object-cover h-[22rem] w-96 m-auto"
								src={wishlist}
								alt=""
							/>
						</div>
						<div className="flex items-center justify-center w-full m-auto">
							<h1 className="mb-3 mt-3 text-[1rem] bimobile:text-[1.2rem] tablet:text-[2rem] ipad:text-[2.2rem] font-bold leading-tight  sm:text-4xl lg:text-5xl dark:text-white">
								Your wishlist is currently empty{' '}
							</h1>
						</div>
						<div className="flex items-center w-full m-auto justify-center">
							<p className="mb-5 text-[0.7rem] tablet:text-[1.3rem] font-normal text-gray-500 md:text-lg dark:text-gray-400">
								Start adding some items to see them here!
							</p>
						</div>

						<Link
							to="/products"
							className="flex gap-1 items-center hover:scale-110 text-neutral-white bg-primary-lightblue focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 "
						>
							<svg
								className="mr-2 -ml-1 w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clipRule="evenodd"
								></path>
							</svg>
							View product
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Wishlist;
