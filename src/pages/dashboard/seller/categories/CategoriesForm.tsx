import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../../components/buttons/Button';
import {
	categorySchema,
	categorySchemaType,
} from '../../../../validations/categories/category.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../../../components/Forms/InputText';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import {
	addCategory,
	manipulateAddedCategory,
	manipulateUpdatedCategory,
	updateCategory,
} from '../../../../redux/features/categorySlice';
import { DynamicData } from '../../../../@types/DynamicData';
import useToast from '../../../../hooks/useToast';
import IconLoader from '../../../../components/Loaders/IconLoader';
import { CategoriesFormProps } from '../../../../@types/Category';
import { useEffect } from 'react';

const CategoriesForm: React.FC<CategoriesFormProps> = ({
	categoryData,
	onClose,
}) => {
	const { showErrorMessage, showSuccessMessage } = useToast();
	const { isLoading } = useAppSelector((state) => state.categories);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<categorySchemaType>({ resolver: zodResolver(categorySchema) });

	const handlePropagation = (event: DynamicData) => {
		event?.stopPropagation();
	};

	useEffect(() => {
		if (categoryData) {
			setValue('id', categoryData.id);
			setValue('name', categoryData.name);
			setValue('description', categoryData.description);
		}
	}, [categoryData, setValue]);

	const onSubmit: SubmitHandler<categorySchemaType> = async (
		data: categorySchemaType,
	) => {
		try {
			let res;
			if (categoryData) {
				res = await dispatch(updateCategory(data)).unwrap();
				dispatch(manipulateUpdatedCategory(res.data));
			} else {
				res = await dispatch(addCategory(data)).unwrap();
				dispatch(manipulateAddedCategory(res.data));
			}
			showSuccessMessage(res.message);
			onClose();
		} catch (error) {
			const err = error as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
		}
	};
	return (
		<div
			onClick={onClose}
			className="absolute top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-sm bg-[#4A677C]/50 z-40"
		>
			<div
				onClick={handlePropagation}
				className="relative bg-neutral-white p-8 mobile:p-12 h-2/5 tablet:h-[35%] ipad:h-2/5 w-[90%] mobile:w-2/5 tablet:w-[70%] laptop:w-2/5 rounded-xl min-w-fit"
			>
				<button
					onClick={onClose}
					className="absolute -top-1 -right-1 bg-action-error rounded-full py-1 px-3 text-lg text-neutral-white"
				>
					X
				</button>
				<h1 className=" text-center text-[#256490] font-medium">
					{categoryData ? 'Update category' : 'Add category'}
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="justify-between flex flex-col gap-4 mobile:gap-3"
				>
					<div>
						<label htmlFor="deliveryDate" className="block text-sm font-medium">
							Name:
						</label>
						<FormInput
							type="text"
							placeholder="Category name"
							{...register('name')}
							error={errors.name}
							otherStyles=" bg-neutral-white mt-1 block w-full pl-3 pr-10 py-1 mobile:py-2 tablet:py-4 laptop:py-2 text-base border-2 mobile:text-sm rounded-md"
						/>
					</div>
					<div>
						<label htmlFor="deliveryDate" className="block text-sm font-medium">
							Description:
						</label>
						<FormInput
							type="text"
							placeholder="Category description"
							{...register('description')}
							error={errors.description}
							otherStyles=" bg-neutral-white mt-1 block w-full pl-3 pr-10 py-1 mobile:py-2 tablet:py-4 laptop:py-2 text-base border-2 mobile:text-sm rounded-md"
						/>
					</div>
					<Button
						url={null}
						buttonType="submit"
						title={
							isLoading ? (
								<>
									<IconLoader className="animate-spin mr-1" />{' '}
									{'Processing....'}
								</>
							) : categoryData ? (
								'Update'
							) : (
								'Add'
							)
						}
						color={`${categoryData ? 'bg-action-success' : 'bg-custom-gradient hover:scale-105'}`}
						otherStyles=" ipad:h-10 tablet:h-12 rounded-md w-full font-medium"
					/>
				</form>
			</div>
		</div>
	);
};

export default CategoriesForm;
