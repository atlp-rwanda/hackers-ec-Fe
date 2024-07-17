import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { getRecommendedProducts } from '../redux/features/recommendedProductSlice';
import { DynamicData } from '../@types/DynamicData';
import RecommendedDesign from '../components/Recommend';
import { ScaleLoader } from 'react-spinners';

interface RecommendedProps {
	prodId: string;
}

const RecommendedProduct = ({ prodId }: RecommendedProps) => {
	const dispatch = useAppDispatch();
	const { products, isLoading, error } = useAppSelector(
		(state) => state.recommendedProducts,
	);

	useEffect(() => {
		if (prodId) {
			dispatch(getRecommendedProducts(prodId)).unwrap();
		}
	}, [dispatch, prodId]);

	return (
		<>
			{Array.isArray(products) && products.length > 0 && (
				<div className="text-2xl pb-2 mt-5">
					<h2>You may also like:</h2>
				</div>
			)}

			<div className="grid mobile:grid-cols-2 gap-5 pb-4 tablet:grid-cols-3 ipad:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-4 h-full rounded-md">
				{isLoading && (
					<div className="w-full h-full flex items-center justify-center absolute">
						<ScaleLoader color="#256490" role="progressbar" />
					</div>
				)}
				{error && <p>{error}</p>}
				{products &&
					products?.map((item: DynamicData) => (
						<RecommendedDesign key={item.id} item={item} />
					))}
			</div>
		</>
	);
};

export default RecommendedProduct;
