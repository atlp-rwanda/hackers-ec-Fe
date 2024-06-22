import Button from '../../../components/buttons/Button';

const Products = () => {
	return (
		<div className="flex-center flex-1 h-full flex flex-col gap-4">
			<div className="text-4xl">Products Page</div>
			<Button
				url={'new'}
				buttonType="button"
				title="Add product"
				otherStyles="rounded-md"
			/>
		</div>
	);
};

export default Products;
