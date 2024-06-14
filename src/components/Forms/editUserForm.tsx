// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect } from 'react';
import { FaLessThan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../redux/features/getUserSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { userType } from '../../@types/userType';
import { getRoles } from '../../redux/features/getRolesSlice';
import { roleType } from '../../@types/roleTypes';
import {
	updateUserRoleSchema,
	updateUserRoleSchemaType,
} from '../../validations/updatUserRoleValidations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicData } from '../../@types/DynamicData';
import { assignRoles } from '../../redux/features/AssignrolesSlice';
import useToken from '../../hooks/useToken';
import useToast from '../../hooks/useToast';
import { MoonLoader } from 'react-spinners';
interface userFormType {
	id?: string;
}
const EditUserForm = (props: userFormType) => {
	const users = useAppSelector(
		(state) => state.allUsers.data[state.allUsers.data.length - 1],
	);
	const roles = useAppSelector(
		(state) => state.allRoles.data[state.allRoles.data.length - 1],
	);
	const roleLoading = useAppSelector((state) => state.allRoles.isLoading);
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();
	const id = props.id;
	const { accessToken } = useToken();
	const navigate = useNavigate();
	const url = window.location.pathname;
	useEffect(() => {
		dispatch(getUser()).unwrap();
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRoles()).unwrap();
	}, [dispatch]);

	const handleNavigation = () => {
		if (url) {
			navigate(-1);
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<updateUserRoleSchemaType>({
		resolver: zodResolver(updateUserRoleSchema),
	});

	const onSubmit: SubmitHandler<updateUserRoleSchemaType> = async (
		data: updateUserRoleSchemaType,
	) => {
		try {
			const { role } = data;
			const token = accessToken;
			if (id && token) {
				const res = await dispatch(assignRoles({ id, role, token })).unwrap();
				showSuccessMessage(res.message);
				navigate('/dashboard/admin/users');
			}
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err.response.data.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
		}
	};

	const getUserInfo = () => {
		return users?.data.filter((item: userType) => item?.id === id) || '';
	};
	const useR = getUserInfo();

	return (
		<>
			{roleLoading ? (
				<div className="setEditMainDiv   fixed  w-full  top-0 shadow-2xl z-[100] h-full tablet:flex  tablet:items-center tablet:justify-center">
					<div className=" fixed w-full h-full  z-[100]  bg-primary-lightblue/30 backdrop-blur-sm  left-0  top-0">
						<div className=" bg-neutral-whit w-full h-full flex  justify-center items-center z-[200] ">
							<div className=" m-auto">
								<MoonLoader
									color="#000"
									role="progressbar"
									data-testid="role-form-loader"
								/>
							</div>{' '}
						</div>
					</div>
				</div>
			) : (
				<div className="setEditMainDiv   absolute  top-1 left-1  right-1  w-full z-[500] h-full flex items-center justify-center">
					<div
						className=" fixed w-full h-full  z-[100]  bg-primary-lightblue/30 backdrop-blur-sm  left-0  top-0"
						onClick={handleNavigation}
					></div>

					<div className="setEditSubMainDiv w-[98%] z-[700] rounded-md  top-  flex flex-col bg-neutral-white shadow-2xl px-4  pt-8 pb-8 gap-5 mobile:gap-10 mobile:w-[80%] mobile:m-auto tablet:w-[60%] ipad:w-[50%] mobile:py-7">
						<div className="backButton mobile:w-[78%] mobile:m-auto mobile:items-center">
							<span className="mobile:w-[90%] mobile:m-auto">
								<button
									className="flex items-center border px-4 rounded-2xl  bg-action-success text-neutral-white gap-3 hover:bg-neutral-white hover:text-action-success hover:bg-opacty-40"
									onClick={handleNavigation}
									name="back"
								>
									<span className="text-[11px]">
										{' '}
										<FaLessThan />{' '}
									</span>
									<p className=" font-bold text-[15px]">Back</p>
								</button>
							</span>
						</div>

						<div className="setRolesForm w-full flex  flex-col gap-7     mobile:w-[90%] mobile:m-auto mobile:gap-10">
							<h3 className="w-full text-center text-primary-lightblue font-semibold ipad:text-[22px]">
								Edit Users
							</h3>
							<div className="flex flex-col gap-2 text-[15px] pl-4 mobile:flex-row mobile:gap-[4.5rem] items-center mobile:w-[90%] mobile:m-auto ">
								<p className="  font-semibold">Email</p>
								<p className=" bg-overlay bg-opacity-20 w-[90%]  py-1 px-4 rounded-lg font-[400] mobile:px-5">
									{' '}
									{useR && useR.map((item: DynamicData) => item.email)}
								</p>
							</div>
							<form
								action=""
								onSubmit={handleSubmit(onSubmit)}
								className=" flex flex-col pl-4 text-[15px] gap-5 mobile:flex-row mobile:w-[90%] mobile:m-auto mobile:items-center "
							>
								<label htmlFor="role" className=" font-semibold">
									Update role
								</label>

								<select
									{...register('role')}
									name="role"
									id="role"
									className="py-2 rounded-lg border pl-5 mobile:py-0 mobile:pl-1 mobile:w-[30%] mobile:h-[1.7rem] mobile:text-[13px]"
								>
									<option value="">select-role</option>
									{roles?.data &&
										roles?.data.map((item: roleType) => (
											<option key={item.id} value={item.roleName}>
												{item.roleName}
											</option>
										))}
								</select>

								<button
									type="submit"
									className="w-full bg-action-success py-2  rounded-lg text-neutral-white mobile:w-[27%] mobile:h-[1.7rem]  mobile:py-0 mobile:text-[13px]"
								>
									update
								</button>
							</form>
							<div className="">
								<p className="mobile:text-wrap text-action-error mobile:px-9">
									{errors.role && <p>{errors.role.message}</p>}
								</p>
							</div>
						</div>
						<div className="disableAccForm w-full flex flex-col text-[15px] gap-2 mobile:w-[85%] mobile:m-auto mobile:items-center">
							<h2 className=" font-semibold mobile:w-[90%]">
								Enable/disable account
							</h2>
							<span className="whiteSpace bg-overlay  bg-opacity-20 py-12 mobile:w-[90%] rounded"></span>
							<span className="mobile:w-[90%] mobile:m-auto">
								<button
									type="button"
									className="w-full bg-action-success py-2  rounded-lg text-neutral-white mobile:w-[20%] mobile:h-[2rem]  mobile:py-0"
								>
									Enable
								</button>
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EditUserForm;
