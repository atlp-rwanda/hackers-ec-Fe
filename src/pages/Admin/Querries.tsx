import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { DynamicData } from '../../@types/DynamicData';
import { getQuerries } from '../../redux/features/Queries/querySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import formatDate from '../../utils/DateConversion';
import Pagination from '../../utils/Pagination';

const Querries = () => {
	const dispatch = useAppDispatch();
	const { isLoading, querries } = useAppSelector((state) => state.queries);
	const navigate = useNavigate();

	const numberOfQuerries = querries.length;
	useEffect(() => {
		dispatch(getQuerries()).unwrap();
	}, [dispatch]);

	const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = 10;
	const orderArray = Array.isArray(querries) ? querries : [];
	const reversedOrderArray = [...orderArray].reverse();
	const offset = currentPage * itemsPerPage;
	const query = reversedOrderArray.slice(offset, offset + itemsPerPage);
	const pageCount = Math.ceil(reversedOrderArray.length / itemsPerPage);

	const handlePageChange = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};

	const handleSingleQuery = (id: string) => {
		navigate(`/dashboard/querries/${id}`);
	};
	return (
		<div className="parent_container relative max-h-[80%] overflow-y-scroll overflow-hidden pb-4 mt-4 h-full">
			{isLoading ? (
				<div className="w-full absolute h-full flex items-center justify-center">
					<ScaleLoader
						color="#256490"
						role="progressbar"
						aria-label="single_product_loader"
					/>
				</div>
			) : numberOfQuerries <= 0 ? (
				<div className="w-full h-[90%] flex items-center justify-center ">
					<h2 className="text-center font-bold text-2xl">No Messages</h2>
				</div>
			) : (
				<>
					<div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-10 bg-neutral-white p-2 rounded-md max-w-[90%]">
						<div className="flex justify-between items-center">
							<h1 className="mb-5 text-lg">Messages</h1>
						</div>
						<table className="tables pt-2 p-3 overflow-hidden overflow-x-scroll max-w-[18rem] tablet:max-w-[100%]">
							<thead className="bg-[#256490] text-neutral-white text-left overflow-hidden rounded-3xl p2">
								<tr className="rounded-xl text-sm ">
									<th>No</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Subject</th>
									<th>Message</th>
									<th className="expand">Date</th>
								</tr>
							</thead>
							<tbody className="text-slate-700">
								{query.map((query: DynamicData, index: number) => (
									<tr
										onClick={() => handleSingleQuery(query.id)}
										key={index}
										className={`hover:bg-primary-lightblue/30 cursor-pointer relative text-sm ${index % 2 !== 0 ? 'bg-[#DDDD]' : ''}`}
									>
										<td>{index + 1 + offset}</td>
										<td>{query.firstName}</td>
										<td>{query.lastName}</td>
										<td>{query.email}</td>
										<td>{query.subject}</td>
										<td>
											{query.message.length > 15
												? query.message.slice(0, 25) + '...'
												: query.message}
										</td>
										<td>{formatDate(query.createdAt)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex items-center justify-center">
						<Pagination
							data-testid="pagination-component"
							pageCount={pageCount}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Querries;
