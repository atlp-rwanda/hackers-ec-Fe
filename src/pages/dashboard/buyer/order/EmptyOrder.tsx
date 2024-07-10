import BackButton from '../../../../components/buttons/BackButton';
import { emptyOrder } from '../../../../utils/images';

function EmptyOrder() {
	return (
		<>
			<div className="flex flex-col items-center space-y-5 bg-neutral-grey/15 rounded-lg pt-4 pb-8">
				<div className="w-[40%] ipad:w-[25%]">
					<img
						src={emptyOrder}
						alt="empty order icon"
						className="text-action-error"
					/>
				</div>
				<h2 className="text-center font-bold text-2xl">No Orders Placed Yet</h2>
				<p className="text-center">
					No orders found. Why not browse our selection ?
				</p>
				<BackButton
					otherStyles="transition duration-100 ease-in-out bg-custom-gradient hover:scale-105 text-neutral-white button-size  rounded-full mt-20 "
					isBordered
					url="/products"
					title="Time to shop !"
				/>
			</div>
		</>
	);
}

export default EmptyOrder;
