/**
 * ProfileUser Component
 *
 * This component is responsible for rendering the user profile page, enabling users to view and update their profile information.
 * It integrates `react-hook-form` for form handling and employs Zod for schema validation to ensure the integrity of user input.
 * Additionally, it utilizes Redux for state management, facilitating actions for fetching and updating user profile data.
 *
 * Custom components and hooks used in this component include:
 * - `FormInput`: Renders input fields for the form.
 * - `Button`: Provides a submit button for the form.
 * - `IconLoader`: Displays a loading icon when data is being processed or fetched.
 * - `useToast`: Hook for showing toast notifications to the user.
 * - `useAppDispatch` and `useAppSelector`: Hooks from Redux for dispatching actions and accessing the state, respectively.
 *
 * The component also makes use of the `UserUpdateSchema` for form validation, ensuring that the user's input matches the predefined schema.
 */
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Upload from '../../assets/upload.svg';
import FormInput from '../Forms/InputText';
import useToast from '../../hooks/useToast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
	fetchUserProfile,
	updateUserProfile,
	updateUserProfileImage,
} from '../../redux/features/userUpdateSlice';
import {
	UserUpdateSchema,
	UserUpdateSchemaType,
} from '../../validations/auth/profile.validation';
import { UserProfile } from '../../@types/auth/profileTypes';
import Button from '../buttons/Button';
import IconLoader from '../Loaders/IconLoader';
import { DynamicData } from '../../@types/DynamicData';

const ProfileUser = () => {
	const dispatch = useAppDispatch();
	const { data, isLoading } = useAppSelector((state) => state.profile) || {};
	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const { showErrorMessage, showSuccessMessage } = useToast();

	const [formData, setFormData] = useState<UserUpdateSchemaType>({
		...data,
	});
	useEffect(() => {
		dispatch(fetchUserProfile());
	}, [dispatch]);

	useEffect(() => {
		if (data) {
			const birthDate = data?.birthDate ? new Date(data.birthDate) : undefined;
			const zipCode = data.zipCode ? String(data.zipCode) : undefined;
			const formattedDate = birthDate?.toISOString().split('T')[0];
			setFormData({ ...data, birthDate: formattedDate, zipCode });
		}
	}, [data]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserUpdateSchemaType>({
		resolver: zodResolver(UserUpdateSchema),
		defaultValues: formData,
	});

	useEffect(() => {
		reset(formData);
	}, [formData, reset]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedImage(e.target.files[0]);
		}
	};

	const onSubmit: SubmitHandler<UserUpdateSchemaType> = async (updatedData) => {
		try {
			delete updatedData.email;
			const res = await dispatch(updateUserProfile(updatedData as UserProfile));

			res.payload.status == 'SUCCESS'
				? showSuccessMessage(res.payload.message)
				: showErrorMessage(res.payload.message);
			if (selectedImage) {
				await dispatch(updateUserProfileImage(selectedImage));
			}
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data || err?.message || 'Something went wrong! Please try again!',
			);
		}
	};

	return (
		<div className="flex flex-col gap-10 bg-overlay z-[-1]">
			<div className="flex justify-around px-8 gap-10 items-center py-4 tablet:w-[50%] tablet:gap-2">
				<div className="bg-custom-gradient absolute w-[100%] h-[20rem] top-[-8rem] rounded-3xl z-0 tablet:rounded-full tablet:h-[35rem] tablet:w-[50%] tablet:top-[-20rem] tablet:rotate-[-10deg]"></div>
				<div className="h-auto tablet:px-6 flex z-10">
					<div className="w-[6rem] tablet:w-[10rem] flex justify-center items-center">
						<img
							src={data?.profileImage}
							alt="profile image"
							className="rounded-full w-24 h-16 tablet:w-96 tablet:h-32 border-4 border-neutral-white"
						/>
					</div>

					<div>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
							id="profileImageUpload"
						/>
						<label
							htmlFor="profileImageUpload"
							className="w-full max-w-[5rem] cursor-pointer"
						>
							<img src={Upload} alt="upload icon" className="block mt-[5rem]" />
						</label>
					</div>
				</div>
				<div className="text-neutral-white mx-4 tablet:mx-6 z-10">
					<h1 className="font-semibold text-1xl py-2 tablet:text-4xl">
						Hello, {data?.firstName}
					</h1>
					<p className="font-medium text-sm tablet:text-[1rem]">
						This is your profile page, feel free update your personal
						information
					</p>
				</div>
			</div>
			<div className="flex flex-col py-10 px-6 tablet:flex-row my-14">
				<div className="flex justify-center items-center w-[100%] font-poppins tablet:w-[10rem]">
					<div className="flex flex-col gap-3 w-[10rem] font-bold bg-neutral-white rounded shadow relative tablet:mb-auto">
						<span className="absolute h-8 w-2 bg-primary-lightblue top-1"></span>
						<p className="text-primary-lightblue text-center">Profile</p>
						<p className="text-center font-bold">Password</p>
					</div>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="py-4 flex flex-col tablet:flex-row justify-around tablet:px-2 target:w-[80%] w-[100%]"
				>
					<div className="flex flex-col">
						<label className="flex flex-col font-semibold gap-3">
							First Name:
							<FormInput
								type="text"
								placeholder="Ivy"
								otherStyles="form-input"
								{...register('firstName', {
									required: 'First name is required',
								})}
								error={errors.firstName}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Last Name:
							<FormInput
								type="text"
								placeholder="Jacky"
								otherStyles="form-input"
								{...register('lastName', {
									required: 'Last name is required',
								})}
								error={errors.lastName}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Email:
							<FormInput
								type="text"
								disabled
								placeholder="email@example.com"
								otherStyles="form-input"
								{...register('email', {
									required: 'Email is required',
								})}
								error={errors.email}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Gender:
							<div className="w-full bg-[#D9D9D9] text-black/75 px-2 rounded-md mt-2">
								<select
									{...register('gender')}
									className="w-full outline-none bg-[#D9D9D9]"
								>
									<option value="Female">Female</option>
									<option value="Male">Male</option>
								</select>
							</div>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Phone Number:
							<FormInput
								type="text"
								placeholder="0780000000"
								otherStyles="form-input"
								{...register('phoneNumber')}
								error={errors.phoneNumber}
							/>
						</label>
					</div>

					<div className="flex flex-col">
						<label className="flex flex-col font-semibold gap-3">
							Birth Date:
							<FormInput
								type="text"
								placeholder="10/10/23"
								otherStyles="form-input"
								{...register('birthDate')}
								error={errors.birthDate}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Language:
							<FormInput
								type="text"
								placeholder="Swahili"
								otherStyles="form-input"
								{...register('preferredLanguage')}
								error={errors.preferredLanguage}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Currency:
							<div className="w-full bg-[#D9D9D9] text-black/75 px-2 rounded-md mt-2">
								<select
									{...register('preferredCurrency')}
									className="w-full outline-none bg-[#D9D9D9]"
								>
									<option value="Euro">Euro</option>
									<option value="Rwf">Rwf</option>
									<option value="Dollar">Dollar</option>
									<option value="Pound">Pound</option>
								</select>
							</div>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Country:
							<FormInput
								type="text"
								placeholder="Rwanda"
								otherStyles="form-input"
								{...register('country')}
								error={errors.country}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							City:
							<FormInput
								type="text"
								placeholder="Kigali"
								otherStyles="form-input"
								{...register('city')}
								error={errors.city}
							/>
						</label>
					</div>
					<div className="flex flex-col">
						<label className="flex flex-col font-semibold gap-3">
							Primary Address:
							<FormInput
								type="text"
								placeholder="Nyarugenge"
								otherStyles="form-input"
								{...register('addressLine1')}
								error={errors.addressLine1}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Secondary Address:
							<FormInput
								type="text"
								placeholder="Muhanga"
								otherStyles="form-input"
								{...register('addressLine2')}
								error={errors.addressLine2}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3 mb-10">
							Zip Code:
							<FormInput
								type="text"
								placeholder="0000"
								otherStyles="form-input"
								{...register('zipCode')}
								error={errors.zipCode}
							/>
						</label>
						<Button
							url={null}
							buttonType="submit"
							title={
								isLoading ? (
									<>
										<IconLoader className="animate-spin mr-1" />{' '}
										{'Please wait....'}
									</>
								) : (
									'Update'
								)
							}
							otherStyles="rounded-xl"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileUser;
