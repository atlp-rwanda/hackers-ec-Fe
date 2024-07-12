const WaterPercentCard = ({
	percent,
	background,
	borderColor,
}: {
	percent: number;
	background: string;
	borderColor: string;
}) => {
	const percentage = (value: number): number => {
		return -80 + (value * 100) / 100;
	};

	return (
		<div className="w-full h-full flex-center my-6">
			<div
				className={`floating-box w-[150px] h-[150px] rounded-full border-4 ${borderColor} relative overflow-hidden shadow-custom-heavy`}
			>
				<div
					className={`wave -one waves-floating ${background}`}
					style={{
						bottom: `${percentage(percent)}%`,
					}}
				/>
				<div
					className={`wave -two waves-floating ${background}`}
					style={{
						bottom: `${percentage(percent)}%`,
					}}
				/>
				<div
					className={`wave -three waves-floating ${background}`}
					style={{
						bottom: `${percentage(percent)}%`,
					}}
				/>
				<div className="absolute w-full h-full flex-center text-2xl text-neutral-black/80 font-extrabold">
					{percent}%
				</div>
			</div>
		</div>
	);
};

export default WaterPercentCard;
