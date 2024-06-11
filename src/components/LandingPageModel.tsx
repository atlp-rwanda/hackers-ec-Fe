import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonIcon } from './buttons/ButtonIcon';
import { ImSearch } from 'react-icons/im';
import { motion, AnimatePresence } from 'framer-motion';
import { bgVariants, modalVariants, navLinkVariants } from '../utils/variants';

interface ModalProps {
	openModel: boolean;
	toggleModel: () => void;
}

const LandingPageModel: React.FC<ModalProps> = ({ openModel, toggleModel }) => {
	return (
		<AnimatePresence>
			{openModel && (
				<motion.div
					className="w-full h-screen backdrop-blur fixed z-50 flex flex-col top-[5%] ipad:top-[10%] p-10 ipad:hidden"
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={bgVariants}
				>
					<motion.div
						className="middle_nav flex-col pt-16 mobile:pt-24 mt-4 mobile:mt-10 py-4 z-50 bg-neutral-white h-full rounded-md shadow"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={modalVariants}
					>
						<form className="nav_search flex flex-col mobile:flex-row items-center justify-center gap-4 px-4 mobile:px-0">
							<input
								type="text"
								className="border-primary-lightblue border-2 inline-block rounded-r-full rounded-l-full h-8 w-full mobile:w-[60%] px-4"
								placeholder="Search ..."
							/>
							<ButtonIcon
								className=" w-full mobile:w-[20%] px-16 mobile:px-10 "
								onClick={toggleModel}
							>
								<ImSearch className="text-lg" /> Search
							</ButtonIcon>
						</form>
						<div className="w-full flex flex-col items-center">
							<nav className="navigations flex flex-col items-center justify-around mt-10 text-sm mobile:text-base font-semibold w-1/2 p-2 gap-10">
								{['Home', 'Products', 'About', 'Contacts'].map((text, i) => (
									<motion.div
										key={text}
										custom={i}
										initial="hidden"
										animate="visible"
										exit="exit"
										variants={navLinkVariants}
									>
										<NavLink
											to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
											className="text-2xl w-full py-1 px-4 rounded"
											onClick={toggleModel}
										>
											{text}
										</NavLink>
									</motion.div>
								))}
							</nav>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LandingPageModel;
