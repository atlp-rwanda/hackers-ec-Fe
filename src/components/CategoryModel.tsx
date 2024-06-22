import { useEffect } from 'react';
import { fetchCategories } from '../redux/features/categorySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { ScaleLoader } from 'react-spinners';

interface ModalProps {
	openModel: boolean;
}

const CategoryModel: React.FC<ModalProps> = ({ openModel }) => {
	const { isLoading, categories } = useAppSelector((state) => state.categories);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categories && !categories.length) {
			dispatch(fetchCategories()).unwrap();
		}
	}, [dispatch, categories]);

	return (
		<>
			{isLoading ? (
				<div className="w-full h-full flex items-center justify-center absolute">
					<ScaleLoader color="#256490" />
				</div>
			) : (
				<>
					{openModel && (
						<div className=" absolute bg-[#eff4f8] flex flex-col top-12 right-0 z-10 w-full px-4 py-4 rounded-b-xl">
							{categories.map((item, idx) => (
								<span
									className="a_category a_link p-2 text-xl font-semibold text-primary-lightblue cursor-pointer"
									key={idx}
								>
									{item.name}
								</span>
							))}
						</div>
					)}
				</>
			)}
		</>
	);
};

export default CategoryModel;
