import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { DynamicData } from '../../@types/DynamicData';
import BackButton from '../../components/buttons/BackButton';
import { getSingleQuery } from '../../redux/features/Queries/querySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import CopyButton from '../../components/buttons/CopyBtn';

const SingleQuerries = () => {
	const dispatch = useAppDispatch();
	const { isLoading, singleQuery } = useAppSelector((state) => state.queries);
	const { id } = useParams<{ id: string }>();
	const singleQueryNumber = singleQuery.length;
	useEffect(() => {
		if (id) {
			dispatch(getSingleQuery(id || '')).unwrap();
		}
	}, [dispatch, id]);

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
			) : singleQueryNumber <= 0 ? (
				<div className="w-full h-[90%] flex items-center justify-center ">
					<h2 className="text-center font-bold text-2xl">No Messages</h2>
				</div>
			) : (
				<>
					<div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-10 bg-neutral-white px-8 rounded-md max-w-[100%] py-7">
						<div className="flex justify-end">
							<BackButton
								isBordered
								url="/dashboard/querries"
								otherStyles="rounded-3xl p-2 bg-primary-lightblue/90 text-neutral-white hover:bg-primary-lightblue"
								title={''}
							/>
						</div>
						<div className="rounded-md">
							{singleQuery.map((query: DynamicData, index: number) => (
								<div key={index} className="space-y-4">
									<h1 className="mb-5 text-2xl font-bold ">
										{query.firstName} {query.lastName}
									</h1>
									<div className="flex gap-3 ipad:items-center flex-col tablet:flex-row ">
										<h2 className="text-lg">
											<span className="font-semibold pr-1">Email:</span>
											<span className="italic">{query.email}</span>
										</h2>
										<CopyButton
											name="Copy Email"
											text="Copy Email"
											value={query.email}
										/>
									</div>

									<p className="text-lg">
										<span className="font-semibold pr-1">Message:</span>
										{query.message}
									</p>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SingleQuerries;
