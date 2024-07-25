/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsTelephone } from 'react-icons/bs';
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaXTwitter,
} from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoLocationOutline } from 'react-icons/io5';
import Chat from '../components/chat/ChatComponent';
import useHandleResize from '../hooks/useHandleResize';
import {
	queryTypes,
	queryValidation,
} from '../validations/Queries/queryValidations';
import { sendQuery } from '../redux/features/Queries/querySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import useToast from '../hooks/useToast';
import { DynamicData } from '../@types/DynamicData';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HashLoader } from 'react-spinners';

const Contacts = () => {
	const { show } = useHandleResize();
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.queries);
	const { showSuccessMessage, showErrorMessage } = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<queryTypes>({
		resolver: zodResolver(queryValidation),
	});

	const onSubmit: SubmitHandler<queryTypes> = async (formData: queryTypes) => {
		try {
			const data = await dispatch(
				sendQuery({
					lastName: formData.lastName,
					firstName: formData.firstName,
					subject: formData.subject,
					email: formData.email,
					message: formData.message,
				}),
			)
				.unwrap()
				.catch((err) => {
					showErrorMessage(
						err?.data?.message || 'Unknown error occurred! Please try again!',
					);
				});
			showSuccessMessage(data.message);

			reset();
		} catch (err: unknown) {
			const error = err as DynamicData;
			showErrorMessage(
				error?.data?.message ||
					(err as any)?.message ||
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
		<>
			<div
				className={`w-full h-screen flex ${!show ? 'items-center' : 'items-end pb-10 mt-[10rem]'} my-40 justify-center ipad:my-0 mobile:my-24`}
			>
				<div className="flex w-[100%] flex-col laptop:flex-row py-6 px-[5%] gap-10 ipad:flex-row">
					{show && (
						<div className="laptop:w-[50%] w-full laptop:h-full bg-contactImage text-neutral-white tablet:px-10 tablet:gap-10 text-wrap flex flex-col px-6 h-full py-16  gap-6 rounded-3xl">
							<h1 className="text-2xl font-bold ">Get In Touch</h1>
							<p className="text-[14px] font-light">
								Have questions or need assistance? Reach out, and let's create a
								universe of possibilities together!
							</p>

							<div className="flex gap-4 items-center laptop:text-2xl">
								<IoLocationOutline className="text-neutral-white text-4xl  tablet:text-5xl laptop:text-3xl" />
								<p className="text-[14px] font-light">
									123 Main Street, New York, NY 10001
								</p>
							</div>
							<div className="flex gap-4 items-center">
								<BsTelephone className="text-neutral-white text-2xl tablet:text-4xl laptop:text-2xl" />
								<p className="text-[14px] font-light">+1 123-456-7890</p>
							</div>
							<div className="flex gap-4 items-center">
								<HiOutlineMail className="text-neutral-white text-2xl tablet:text-4xl laptop:text-2xl" />
								<p className="text-[14px] font-light text-wrap">
									aphrogarrix250@gmail.com
								</p>
							</div>

							<div className="mt-auto">
								<div className="flex gap-12 mt-2 tablet:gap-16">
									<FaFacebookF className="text-neutral-white text-2xl " />
									<FaInstagram className="text-neutral-white text-2xl" />
									<FaLinkedinIn className="text-neutral-white text-2xl" />
									<FaXTwitter className="text-neutral-white text-2xl" />
								</div>
							</div>
						</div>
					)}
					<div className="gap-6 mt-1 laptop:gap-5 laptop:w-[50%] w-full flex flex-col laptop:px-5 laptop:h-full justify-between">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-4 w-full h-auto"
						>
							<div className="">
								<input
									type="text"
									placeholder="Last name"
									{...register('lastName')}
									className="px-8 py-2 rounded-md bg-inputBg text-inputCaption w-full"
								/>
								{errors.lastName && (
									<p className="text-action-error text-[13px]  bottom-[-16px] left-0">
										{errors.lastName?.message}
									</p>
								)}
							</div>

							<div className="">
								<input
									type="text"
									placeholder="First name"
									{...register('firstName')}
									className="px-8 py-2 rounded-md bg-inputBg text-inputCaption w-full"
								/>
								{errors.firstName && (
									<p className="text-action-error text-[13px]  bottom-[-16px] left-0">
										{errors.firstName?.message}
									</p>
								)}
							</div>

							<div className="">
								<input
									type="text"
									placeholder="Subject"
									{...register('subject')}
									className="px-8 py-2 rounded-md bg-inputBg text-inputCaption w-full"
								/>
								{errors.subject && (
									<p className="text-action-error text-[13px]  bottom-[-16px] left-0">
										{errors.subject?.message}
									</p>
								)}
							</div>

							<div className="">
								<input
									type="text"
									placeholder="Email"
									{...register('email')}
									className="px-8 py-2 rounded-md bg-inputBg text-inputCaption w-full"
								/>
								{errors.email && (
									<p className="text-action-error text-[13px]  bottom-[-16px] left-0">
										{errors.email?.message}
									</p>
								)}
							</div>

							<div className="">
								<textarea
									rows={1000}
									cols={1000}
									placeholder="Message"
									{...register('message')}
									className="px-8 py-2 rounded-md bg-inputBg text-inputCaption h-[200px] w-full"
								/>
								{errors.message && (
									<p className="text-action-error text-[13px]  bottom-[-16px] left-0">
										{errors.message?.message}
									</p>
								)}
							</div>

							<button
								type="submit"
								className="bg-custom-gradient text-neutral-white w-full h-[44px] rounded-[10px] mt-4"
							>
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
			<Chat />
		</>
	);
};

export default Contacts;
