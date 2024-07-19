const NotificationSkeleton = () => {
	return (
		<div
			aria-label="skeleton"
			className="w-full h-36 rounded-xl mb-4 bg-neutral-grey/20 animate-pulse flex gap-5 flex-col p-5"
		>
			<div className="w-full h-[30%] bg-neutral-grey/20 rounded-lg" />
			<div className="w-full h-[60%] bg-neutral-grey/20 rounded-lg" />
		</div>
	);
};

export default NotificationSkeleton;
