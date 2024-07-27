import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { DynamicData } from '../../../../src/@types/DynamicData';
import OrderTableComp from '../../../../src/components/dashboard/buyer/OrderTableComp';

vi.mock('../../../../src/components/dashboard/buyer/OrderTableRow', () => ({
	__esModule: true,
	default: ({ item }: { item: DynamicData }) => (
		<tr>
			<td>{item.id}</td>
		</tr>
	),
}));

vi.mock('../../../../src/components/dashboard/buyer/Pagination', () => ({
	__esModule: true,
	default: ({
		onPageChange,
	}: {
		onPageChange: (event: { selected: number }) => void;
	}) => (
		<div
			data-testid="pagination"
			onClick={() => onPageChange({ selected: 1 })}
		/>
	),
}));

const mockOrders: DynamicData[] = [
	{
		id: '1',
		orderDate: '2023-01-01',
		deliveryDate: '2023-01-02',
		items: 3,
		totalQuantity: 5,
		totalPrice: 50,
		status: 'Delivered',
	},
	{
		id: '2',
		orderDate: '2023-02-01',
		deliveryDate: '2023-02-02',
		items: 2,
		totalQuantity: 4,
		totalPrice: 30,
		status: 'Pending',
	},
];

const mockToggleItemModel = vi.fn();
const mockHandlePageClick = vi.fn();

const renderComponent = () => {
	return render(
		<OrderTableComp
			orders={mockOrders}
			openModels={{}}
			toggleItemModel={mockToggleItemModel}
			pageCount={2}
			handlePageClick={mockHandlePageClick}
		/>,
	);
};

describe('OrderTableComp', () => {
	it('should render the table with orders', () => {
		renderComponent();
		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
	});

	it('should render the pagination', () => {
		renderComponent();
		expect(screen.getByTestId('pagination')).toBeInTheDocument();
	});

	it('should handle pagination clicks', () => {
		renderComponent();
		const pagination = screen.getByTestId('pagination');
		fireEvent.click(pagination);
		expect(mockHandlePageClick).toHaveBeenCalledWith({ selected: 1 });
	});

	it('should render OrderTableRow components', () => {
		renderComponent();
		expect(screen.getAllByRole('row').length).toBe(mockOrders.length + 1);
	});
});
