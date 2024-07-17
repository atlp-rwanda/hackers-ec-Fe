import { FaChartLine } from 'react-icons/fa';
import { StatisticCardProps } from '../../@types/StatisticsTypes';

const StatisticCard = ({
	title,
	totalAmount,
	minAmount,
	numberOfItems,
	color,
}: StatisticCardProps) => {
	return (
		<div className="w-full h-max bg-neutral-white rounded-2xl shadow-custom-heavy">
			<div className="w-full h-full shadow-inner-bottom p-5 rounded-2xl">
				<h2 className="text-sm ipad:text-base font-semibold text-neutral-black/70">
					{title}
				</h2>
				<div className="flex items-center justify-between">
					<div className="text-xl ipad:text-2xl font-bold">
						{totalAmount} RWF
					</div>
					<div className={`${color} p-3 text-neutral-white rounded-full`}>
						<FaChartLine size={24} />
					</div>
				</div>
				<div className={`w-full h-2 ${color} rounded-full my-3`} />
				<div
					className={`flex items-center ${minAmount ? 'justify-between' : 'justify-start'} text-xs`}
				>
					{minAmount && (
						<p>
							Available: <strong>{minAmount} RWF</strong>
						</p>
					)}
					<p>
						Total number: <strong>{numberOfItems}</strong>
					</p>
				</div>
			</div>
		</div>
	);
};

export default StatisticCard;
