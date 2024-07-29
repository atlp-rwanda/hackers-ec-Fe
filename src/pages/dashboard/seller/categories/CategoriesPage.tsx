import { RiAddCircleFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import {
	fetchCategories,
	manipulateModelVisiblity,
} from '../../../../redux/features/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CategoriesForm from './CategoriesForm';
import { categorySchemaType } from '../../../../validations/categories/category.validation';
import { HashLoader } from 'react-spinners';

const CategoriesPage = () => {
	const [categoryData, setCategoryData] = useState<categorySchemaType | null>(
		null,
	);
	const { isLoading, categories, isCategoryModelOpen } = useAppSelector(
		(state) => state.categories,
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchCategories()).unwrap();
	}, [dispatch]);

	const onClose = () => {
		dispatch(manipulateModelVisiblity());
		setCategoryData(null);
	};

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 8;

	const categoriesArray = Array.isArray(categories) ? categories : [];
	const offset = currentPage * itemsPerPage;
	const currentCategories = categoriesArray.slice(
		offset,
		offset + itemsPerPage,
	);
	const pageCount = Math.ceil(categoriesArray.length / itemsPerPage);
	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected);
	};
	return (
		<>
			{isLoading ? (
				<div className="w-full h-full flex items-center justify-center">
					<HashLoader
						color="#256490"
						role="progressbar"
						aria-label="single_product_loder"
					/>
				</div>
			) : (
				<div className="mobile:ml-[8%] max-h-[80%] overflow-y-scroll overflow-hidden pb-4 mt-4 h-full">
					<div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-10 bg-neutral-white p-4 rounded-md w-full max-w-[90%] mobile:max-w-[85%]">
						<div
							onClick={onClose}
							className="flex justify-between items-center"
						>
							<h1 className="mb-5">Categories</h1>
							<button className="md:mx-3 px-4 py-1 laptop:py-2 text-neutral-white font-semibold rounded-lg flex items-center space-x-2 bg-custom-gradient">
								<span>Add new</span>
								<RiAddCircleFill className="text-xl" />
							</button>
						</div>
						<table className="tables pt-2 p-3 overflow-hidden overflow-x-scroll max-w-[22rem] mobile:max-w-[18rem] tablet:max-w-[100%]">
							<thead className="bg-[#256490] text-neutral-white text-left overflow-hidden rounded-3xl">
								<tr className="rounded-xl text-sm">
									<th>No</th>
									<th>Name</th>
									<th>Description</th>
									<th className="expand">Action</th>
								</tr>
							</thead>
							<tbody className="text-slate-700">
								{currentCategories &&
									currentCategories.map((item, idx) => (
										<tr
											key={item.id}
											className={`relative text-sm ${idx % 2 !== 0 ? 'bg-[#DDDD]' : ''}`}
										>
											<td>{idx + 1 + offset}</td>
											<td>{item.name}</td>
											<td>{item.description.slice(0, 50)}</td>
											<td
												onClick={() => {
													setCategoryData({
														id: item.id,
														name: item.name,
														description: item.description,
													});
													dispatch(manipulateModelVisiblity());
												}}
												className="relative"
											>
												<button>
													<BsThreeDotsVertical />
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
					{isCategoryModelOpen && (
						<CategoriesForm categoryData={categoryData} onClose={onClose} />
					)}
					<div className="flex items-center justify-center">
						<ReactPaginate
							previousLabel={<GrPrevious />}
							nextLabel={<GrNext />}
							breakLabel={'...'}
							breakClassName={'break-me'}
							pageCount={pageCount}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={handlePageClick}
							containerClassName={'pagination'}
							activeClassName={'active'}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default CategoriesPage;
