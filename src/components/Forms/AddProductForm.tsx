import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { fetchCategories } from '../../redux/features/categorySlice';
import { addProduct, updateProduct } from '../../redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
	productTypes,
	productValidation,
} from '../../validations/products/addProductValidation';
import Button from '../buttons/Button';
import ImageDropZone from '../cards/ImageDropZone';
import IconLoader from '../Loaders/IconLoader';
import FormInput from './InputText';

const AddProductForm = ({ productData }: { productData: productTypes }) => {
	const location = useLocation();

	productData = {
		...location.state,
		price: String(location.state.price),
		quantity: String(location.state.quantity),
		discount: String(location.state.discount),
	};

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [images, setImages] = useState<string[]>(productData?.images || []);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const { showErrorMessage, showSuccessMessage } = useToast();
	const { isLoading, categories } = useAppSelector((state) => state.categories);
	const { isLoading: processing } = useAppSelector((state) => state.product);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<productTypes>({
		resolver: zodResolver(productValidation),
		defaultValues: productData || {},
	});

	const handleDrop = (files: FileList) => {
		const uploadedImages = Array.from(files).map((file) =>
			URL.createObjectURL(file),
		);

		setImageFiles((prev) => [...prev, ...Array.from(files)]);
		setImages((prevImages) => [...prevImages, ...uploadedImages]);
	};

	const handleImages = (e: DynamicData) => {
		const files = Array.from(e.target.files) as File[];
		const uploadedImages = files.map((file) =>
			URL.createObjectURL(file as unknown as MediaSource),
		);
		setImageFiles((prev) => [...prev, ...files]);
		setImages((prevImages) => [...prevImages, ...uploadedImages]);
	};

	const removeImage = (index: number) => {
		setImageFiles((prev) => prev.filter((_, i) => i !== index));
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	useEffect(() => {
		setValue('images', imageFiles);
	}, [imageFiles, setValue]);

	const onSubmit: SubmitHandler<productTypes> = async (data: productTypes) => {
		try {
			if (productData) {
				if (productData.id) {
					const res = await dispatch(
						updateProduct({ productData: data, id: productData.id }),
					).unwrap();
					showSuccessMessage(res.message);
				} else {
					showErrorMessage('Product ID is missing for update operation.');
				}
			} else {
				const res = await dispatch(addProduct(data)).unwrap();
				showSuccessMessage(res.message);
			}
			navigate('/dashboard/products');
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	if (isLoading) {
		return (
			<div className="flex-1 h-full flex-center flex-col gap-4">
				<HashLoader color="#266491" size={60} role="progressbar" />
				<p className="text-xs">Please wait ...</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex-1 items-start flex-wrap gap-4 text-xs h-[85%] overflow-y-scroll grid grid-cols-1 ipad:grid-cols-2 pb-10 ipad:p-5"
		>
			<div className="bg-neutral-white flex-1 p-5 flex gap-7 h-full flex-col rounded-xl">
				<div>
					<label htmlFor="" className="labels">
						Product Name:
					</label>
					<FormInput
						placeholder="Your product name"
						type="text"
						otherStyles="p-2 rounded-md mt-2"
						{...register('name')}
						error={errors.name}
					/>
				</div>
				<div>
					<label htmlFor="" className="labels">
						Product price:
					</label>
					<FormInput
						placeholder="Your product price"
						{...register('price')}
						type="number"
						otherStyles="p-2 rounded-md mt-2"
						error={errors.price}
					/>
				</div>
				<div>
					<label htmlFor="" className="labels">
						Product discount:
					</label>
					<FormInput
						placeholder="Your product discount"
						{...register('discount')}
						type="number"
						otherStyles="p-2 rounded-md mt-2"
						error={errors.discount}
					/>
				</div>
				<div>
					<label htmlFor="" className="labels">
						Product quantity:
					</label>
					<FormInput
						placeholder="Quantity available"
						{...register('quantity')}
						type="number"
						otherStyles="p-2 rounded-md mt-2"
						error={errors.quantity}
					/>
				</div>
				<div>
					<label htmlFor="" className="labels">
						Product category:
					</label>
					<div className="w-full bg-[#D9D9D9] text-black/75 p-2 rounded-md mt-2">
						<select
							{...register('categoryId')}
							className="w-full outline-none bg-[#D9D9D9]"
							aria-label="select-category"
						>
							<option value={''} disabled>
								Select product category
							</option>
							{categories &&
								categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
						</select>
					</div>
					{errors.categoryId?.message && (
						<p className="text-[9px] text-action-error text-end px-2">
							{errors.categoryId.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="" className="labels">
						Product expiry date:
					</label>
					<FormInput
						placeholder="2525-12-03"
						{...register('expiryDate')}
						type="date"
						otherStyles="p-2 rounded-md mt-2"
						error={errors.expiryDate}
					/>
				</div>
			</div>
			<div className="relative bg-neutral-white p-5 h-max ipad:h-full rounded-xl">
				<div className="h-[40px] mb-3 rounded-xl flex items-center px-4 bg-neutral-black/15">
					Product images
				</div>
				<ImageDropZone
					onDrop={handleDrop}
					handleOnChange={(e) => handleImages(e)}
				/>
				{errors.images?.message && (
					<p className="text-[9px] text-action-error text-end px-2">
						{errors.images.message}
					</p>
				)}
				<div className="relative grid grid-cols-1 mobile:grid-cols-2 gap-4 min-h-[300px] ipad:h-[60%] overflow-y-scroll py-4">
					{images.map((src, index) => (
						<div
							key={src}
							className="relative h-40 border border-dashed border-neutral-grey p-3 rounded-2xl"
						>
							<div
								onClick={() => removeImage(index)}
								className="absolute top-2 right-2 bg-action-error p-1.5 text-neutral-white shadow-inner rounded-full"
							>
								<X size={18} />
							</div>
							<img
								src={src}
								alt={`Preview ${index}`}
								className="w-full h-full object-contain"
							/>
						</div>
					))}
				</div>
				<div className="h-[10%] grid grid-cols-1 place-items-end mt-4 mb-10">
					<Button
						// ariaLabel="submit"
						buttonType="submit"
						disabled={processing}
						otherStyles="p-2 rounded-full text-[10px]"
						title={
							processing ? (
								<IconLoader />
							) : (
								<span>{productData ? 'Update Product' : 'Add Product'}</span>
							)
						}
						url={null}
					/>
				</div>
			</div>
		</form>
	);
};

export default AddProductForm;
