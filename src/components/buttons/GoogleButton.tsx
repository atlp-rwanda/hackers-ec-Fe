import googleIcon from '../../assets/googleIcon.svg';

const GoogleButton = () => {
	return (
		<button className="w-full border border-neutral-grey hover:bg-neutral-grey/15 button-size rounded-xl flex-center gap-3">
			<img src={googleIcon} alt="google icon" className="w-[20px]" />
			<div>Continue with Google</div>
		</button>
	);
};

export default GoogleButton;
