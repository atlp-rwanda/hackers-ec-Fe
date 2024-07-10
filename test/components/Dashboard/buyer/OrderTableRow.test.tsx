import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { DynamicData } from '../../../../src/@types/DynamicData';
import OrderTableRow from '../../../../src/components/dashboard/buyer/OrderTableRow';
import {
	calculateTotalPrice,
	calculateTotalQuantity,
} from '../../../../src/utils/orderCalculations';
import getStatusColor from '../../../../src/utils/statusColor';

vi.mock('react-icons/bs', () => ({
	// @ts-ignore
	BsThreeDotsVertical: ({ onClick, 'aria-label': ariaLabel }) => (
		<div data-testid="three-dots" onClick={onClick} aria-label={ariaLabel} />
	),
}));

vi.mock('../../../../src/utils/orderCalculations', () => ({
	calculateTotalPrice: vi.fn(),
	calculateTotalQuantity: vi.fn(),
}));

vi.mock('../../../../src/utils/statusColor', () => ({
	default: vi.fn(),
}));

vi.mock('../../../../src/components/cards/orderModel', () => ({
	// @ts-ignore
	OrderModel: ({ id, idx, item, state, handleToggle }) => (
		<div data-testid="order-model">
			OrderModel - {id} - {idx}
		</div>
	),
}));

describe('OrderTableRow component', () => {
	const mockToggleItemModel = vi.fn();
	const mockItem: DynamicData = {
		id: '1234567890',
		sales: [
			{
				id: 'sale1',
				deliveryDate: '2023-01-01T00:00:00Z',
				status: 'delivered',
				soldProducts: { price: 100 },
				quantitySold: 2,
			},
		],
		createdAt: '2023-01-01T00:00:00Z',
	};

	beforeEach(() => {
		// @ts-ignore
		calculateTotalPrice.mockReturnValue(200);
		// @ts-ignore
		calculateTotalQuantity.mockReturnValue(2);
		// @ts-ignore
		getStatusColor.mockReturnValue('text-action-success font-semibold');
	});

	const renderWithProps = (openModels: { [key: number]: boolean }) => {
		return render(
			<table>
				<tbody>
					<OrderTableRow
						item={mockItem}
						idx={0}
						openModels={openModels}
						toggleItemModel={mockToggleItemModel}
					/>
				</tbody>
			</table>,
		);
	};

	it('should render the component with the correct data', () => {
		renderWithProps({});
		expect(screen.getByText('#1234567890')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
		expect(screen.getByText('200')).toBeInTheDocument();
		expect(screen.getByText('RWF')).toBeInTheDocument();
		expect(screen.getByTestId('three-dots')).toBeInTheDocument();
	});

	it('should call toggleItemModel when the three dots icon is clicked', () => {
		renderWithProps({});

		const threeDots = screen.getByTestId('three-dots');
		fireEvent.click(threeDots);

		expect(mockToggleItemModel).toHaveBeenCalledWith(0);
	});

	it('should render the OrderModel component when openModels[idx] is true', () => {
		renderWithProps({ 0: true });

		expect(screen.getByTestId('order-model')).toBeInTheDocument();
	});

	it('should not render the OrderModel component when openModels[idx] is false', () => {
		renderWithProps({ 0: false });

		expect(screen.queryByTestId('order-model')).not.toBeInTheDocument();
	});
});
