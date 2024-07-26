interface userStatCardProps {
	title: string;
	totalAmount: string;
	minAmount?: string;
	numberOfItems: number;
	color: string;
	icon: React.ReactNode;
	subtitle: string;
}
const UserStatCard = ({
	title,
	totalAmount,
	minAmount,
	numberOfItems,
	color,
	icon,
	subtitle,
}: userStatCardProps) => {
	return (
		<div className="w-[82%] tablet:w-full h-max bg-neutral-white rounded-2xl shadow-custom-heavy">
			<div className="w-full h-full shadow-inner-bottom p-5 rounded-2xl">
				<h2 className="text-sm ipad:text-base font-semibold text-neutral-black/70">
					{title}
				</h2>
				<div className="flex items-center justify-between">
					<div className="text-xl ipad:text-2xl font-bold">{totalAmount}</div>
					<div className={`${color} p-3 text-neutral-white rounded-full`}>
						{icon}
					</div>
				</div>
				<div className={`w-full h-2 ${color} rounded-full my-3`} />
				<div
					className={`flex items-center ${minAmount ? 'justify-between' : 'justify-start'} text-xs`}
				>
					{minAmount && (
						<p>
							Available: <strong>{minAmount}</strong>
						</p>
					)}
					<p>
						{subtitle}: <strong>{numberOfItems}</strong>
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserStatCard;
