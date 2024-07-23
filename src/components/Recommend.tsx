import ProductPageAddToCart from './carts/ProductPageAddToCart';
import Button from './buttons/Button';
import { FaStar } from 'react-icons/fa6';
import { DynamicData } from '../@types/DynamicData';
import useWish from '../hooks/useWishlist';
import { ThemeContext } from '../hooks/useWishcontext';
import AddToWish from './wishes/AddToWish';

function RecommendedDesign({ item }: DynamicData) {
	const { data: wishes } = useWish();
	return (
		<div
			key={item.id}
			className="product_card bg-neutral-white p-2 m-2 rounded-md shadow"
		>
			<div className="card_profile p-2 w-full flex-grow">
				<div className="w-full h-48 relative">
					<div className="w-full overflow-hidden flex shadow h-48">
						<img
							src={item.images && item.images[0]}
							alt="card_profile"
							className="w-full h-full object-cover rounded-lg"
						/>
					</div>
					<ProductPageAddToCart productId={item.id} />
					{item.discount > 0 && (
						<div className="discount absolute p-1 rounded bg-action-warning text-neutral-white -right-2 -top-2 font-bold">
							{item.discount} %
						</div>
					)}
				</div>
			</div>
			<div className="card_description pl-2 flex-grow">
				<h1 className="py-2">
					{item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
				</h1>
				<div className="ratings flex">
					<span className="ml-2 flex items-center gap-2">
						<FaStar />
						{item.ratings} ratings
					</span>
				</div>
				<div className="price_wish flex justify-between items-center mt-2 gap-2 flex-wrap py-2">
					<h1 className="text-2xl font-bold">
						{item.price}
						<small className="text-base font-normal"> RWF</small>
					</h1>
					<div className="wish flex items-center cursor-pointer">
						<span className="mr-1">add to wish</span>
						<ThemeContext.Provider value={wishes}>
							<AddToWish productId={item.id || ''} btnCss="cursor-pointer" />
						</ThemeContext.Provider>
					</div>
				</div>
			</div>
			<div className="btn flex justify-center">
				<Button
					title="preview product"
					url={`/products/${item.id}`}
					otherStyles={' rounded-l-full rounded-r-full mt-2 font-semibold'}
					buttonType={'button'}
				/>
			</div>
		</div>
	);
}

export default RecommendedDesign;
