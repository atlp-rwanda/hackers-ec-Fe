/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useRef, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { userType } from '../../@types/userType';
import { getRoles } from '../../redux/features/getRolesSlice';
import { roleType } from '../../@types/roleTypes';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import { HashLoader } from 'react-spinners';
import { getUserPag } from '../../redux/features/getUserPagination';
import useToast from '../../hooks/useToast';
interface getUserType {
	arrow?: ReactNode;
	searchIcon?: ReactNode;
	location?: string;
}
const GetUser = (props: getUserType) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [butOverlay, setButOverlay] = useState('');
	const roles = useAppSelector((state) => state.allRoles?.data[0]);
	const roleLoading = useAppSelector((state) => state.allRoles.isLoading);
	const { isLoading, data } = useAppSelector((state) => state.userPagination);
	const pathname = window.location.pathname;
	const dispatch = useAppDispatch();
	const prevPage = useRef(0);
	const { showErrorMessage } = useToast();

	useEffect(() => {
		if (!roles) {
			dispatch(getRoles())
				.unwrap()
				.catch((error) => {
					showErrorMessage(error.message || 'Failed to load wishes');
				});
		}
	}, [dispatch]);
	useEffect(() => {
		if (props.location?.includes('users')) {
			dispatch(getUserPag({ page: currentPage, search: searchQuery }))
				.unwrap()
				.catch((error) => {
					showErrorMessage(error.message || 'Failed to load wishes');
				});
		}
	}, [dispatch, currentPage, searchQuery]);

	const getRoleName = (roleId: string) => {
		return roles?.data.find((role: roleType) => role.id === roleId).roleName;
	};
	const handleOverlay = (userId: string) => {
		setButOverlay(userId === butOverlay ? '' : userId);
	};
	useEffect(() => {
		if (data[data?.length - 1]?.data?.totalPages < prevPage.current) {
			setCurrentPage(1);
		} else {
			setCurrentPage(prevPage.current);
		}
	}, [searchQuery, data[data?.length - 1]?.data?.totalPages]);
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		if (event.target.value.length < 1) {
			setCurrentPage(prevPage.current);
		}
		if (event.target.value.length === 1 && currentPage !== 1) {
			prevPage.current = currentPage;
		}
	};

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected + 1);
		prevPage.current = event.selected + 1;
	};
	const handleButOverlayApp = () => {
		if (butOverlay) {
			setButOverlay('');
		}
	};
	return (
		<div className="relative w-full ipad:w-[93%] ipad:m-auto  shadow-2xl  rounded-2xl flex flex-col h-full ipad:h-[90%] ipad:pt-6  ">
			{isLoading && roleLoading ? (
				<div
					className="flex-1 h-full flex-center flex-col gap-4"
					data-testid="get-user-table-id"
				>
					<HashLoader color="#266491" size={60} role="progressbar" />
					<p className="text-xs">Please wait ...</p>
				</div>
			) : (
				<div
					className="relative ipad:flex ipad:flex-col ipad:gap-1  ipad:h-full"
					onClick={handleButOverlayApp}
				>
					<div className="head h-[8%]  flex p-4 items-center ipad:hidden">
						<span className="text-xs flex-none text-primary-lightblue text-[1.3rem]">
							{props.arrow}
						</span>
						<p className=" text-center  px-[25%]  text-primary-lightblue font-bold text-[20px] mobile:flex-1 ">
							All Users
						</p>
					</div>
					<div className="py-1 w-full flex items-center justify-center">
						<form className="search   w-[80%]  flex border-2 border-black/30  items-center rounded-xl  py-1 px-[2%] overflow-hidden mobile:max-w-[19rem]  ">
							<p className="text-[29px] flex-none ">{props.searchIcon}</p>
							<input
								type="text"
								className=" w-[90%] focus:outline-none px-[13%] placeholder-neutral-black bg-transparent"
								placeholder="Search by email"
								onChange={handleSearch}
							/>
						</form>
					</div>

					<div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-10 bg-neutral-white p-4 rounded-md max-w-[95%]">
						<table className="tables pt-2 p-3 overflow-hidden overflow-x-scroll max-w-[18rem] tablet:max-w-[100%]">
							<thead className="bg-[#256490] text-neutral-white text-left overflow-hidden rounded-3xl p2">
								<tr className="rounded-xl text-sm">
									<th className="">No</th>
									<th> Firstname</th>
									<th> Lastname</th>
									<th> Email</th>
									<th> Active</th>
									<th> Role</th>
									<th className="expand">Action</th>
								</tr>
							</thead>
							<tbody className="text-slate-700">
								{data[data?.length - 1]?.data &&
								data[data?.length - 1]?.data?.users?.length > 0 ? (
									data[data?.length - 1]?.data?.users.map(
										(item: userType, index: number) => (
											<tr
												key={index}
												className={`relative text-sm ${index % 2 !== 0 ? 'bg-[#DDDD]' : ''}`}
											>
												<td className="w-20 h-16">
													{index + 1 + data[data?.length - 1]?.data?.offset}
												</td>
												<td className=" text-sm">{item?.firstName}</td>
												<td>{item?.lastName}</td>
												<td>{item?.email}</td>
												<td>
													{' '}
													{item?.isActive === true ? 'active' : 'unactive'}
												</td>
												<td> {getRoleName(item.role as string)}</td>
												<td className="cursor-ponter ">
													<button
														type="button"
														onClick={() => {
															handleOverlay(item?.id as string);
														}}
														data-testid="dots-button"
													>
														<IoMdMore />
													</button>
													{butOverlay === item.id && (
														<div className="absolute desktop:w-[15%] right-2 laptop:right-16 z-50 -top-10 flex p-2 rounded-lg  pt-5 pl-5">
															<div className="flex flex-col justify-between relative w-full">
																<div className="relative">
																	<div
																		className={` absolute h-[3rem] w-[15rem]  rounded  shadow-2xl  right-3 z-[900] bg-neutral-white px-4 flex flex-col gap-4 tablet:-left-40 py-2 		
																	${index + 1 === 1 ? 'top-7 ' : ''}	
																	
																	`}
																	>
																		<Link
																			to={`/dashboard/roles/${item.id}`}
																			className=""
																		>
																			<div className="text-[26px] flex text-center items-center gap-4  px-2 py-1 rounded-xl bg-neutral-grey bg-opacity-35 hover:bg-opacity-70">
																				<FaEdit />
																				<p className="text-[17px]">
																					Edit roles
																				</p>
																			</div>
																		</Link>
																	</div>
																</div>
															</div>
														</div>
													)}
												</td>
											</tr>
										),
									)
								) : (
									<tr>
										<td
											colSpan={7}
											className="py-4 text-center text-neutral-black"
										>
											No data found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					<div className="flex items-center justify-center flex-row">
						<ReactPaginate
							previousLabel={<GrPrevious />}
							nextLabel={<GrNext />}
							breakLabel={'...'}
							breakClassName={'break-me'}
							pageCount={data[data?.length - 1]?.data?.totalPages || 0}
							marginPagesDisplayed={2}
							pageRangeDisplayed={2}
							onPageChange={handlePageClick}
							containerClassName={'pagination'}
							activeClassName={'active'}
						/>
					</div>
				</div>
			)}
			{pathname.includes('/dashboard/Roles') ? (
				<div className="blueOverlay absolute w-full h-full bg-opacity-60 blur-sm top-0 shadow-2xl z-[100] bg-primary-lightblue "></div>
			) : (
				false
			)}
		</div>
	);
};
export default GetUser;
