import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartDataTypes } from '../../@types/StatisticsTypes';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const SellerBarChart = ({ chartData }: ChartDataTypes) => {
	const data = {
		labels: chartData.map((data) => data.month),
		datasets: [
			{
				label: 'Approved',
				data: chartData.map((data) => data.approvals),
				backgroundColor: ['rgb(38, 100, 145, 1)'],
				borderColor: 'rgb(38, 100, 145)"',
				borderRadius: {
					topLeft: 12,
					topRight: 12,
					bottomLeft: 0,
					bottomRight: 0,
				},
			},
			{
				label: 'Rejected',
				data: chartData.map((data) => data.rejected),
				backgroundColor: ['#660b0b'],
				borderColor: '#660b0b',
				borderRadius: {
					topLeft: 12,
					topRight: 12,
					bottomLeft: 0,
					bottomRight: 0,
				},
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			x: {
				title: {
					display: true,
					text: 'Months',
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Percentages',
				},
			},
		},
	};
	return (
		<Bar
			options={options}
			data={data}
			className="w-full h-full"
			role="presentation"
		/>
	);
};

export default SellerBarChart;
