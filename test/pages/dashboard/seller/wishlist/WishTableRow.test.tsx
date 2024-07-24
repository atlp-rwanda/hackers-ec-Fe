import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DynamicData } from '../../../../../src/@types/DynamicData';
import WishTableRow from '../../../../../src/pages/dashboard/seller/wishlist/WishTableRow';

// @ts-ignore
const mockFormatDate = vi.fn((dateString: string) => 'Formatted Date');

const mockWish: DynamicData = {
	id: 1,
	product: {
		images: ['image1.jpg'],
		name: 'Product 1',
		quantity: 10,
		discount: 5,
		price: 100,
		expiryDate: '2023-12-31',
	},
	numberOfUserWishProduct: 20,
};

describe('WishTableRow component', () => {
	it('should render correctly with all provided props', () => {
		render(
			<WishTableRow wishes={mockWish} index={0} formatDate={mockFormatDate} />,
		);

		expect(screen.getByText('0')).toBeInTheDocument();
		expect(screen.getByAltText('product_images')).toHaveAttribute(
			'src',
			'image1.jpg',
		);
		expect(screen.getByText('Product 1')).toBeInTheDocument();
		expect(screen.getByText('10')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.getByText('20')).toBeInTheDocument();
		expect(screen.getByText('100 RWF')).toBeInTheDocument();
		expect(screen.getByText('Formatted Date')).toBeInTheDocument();
	});

	it('should format the date correctly using the provided formatDate function', () => {
		render(
			<WishTableRow wishes={mockWish} index={0} formatDate={mockFormatDate} />,
		);
		expect(mockFormatDate).toHaveBeenCalledWith('2023-12-31');
		expect(screen.getByText('Formatted Date')).toBeInTheDocument();
	});

	it('should apply the correct background color based on the row index', () => {
		const { rerender } = render(
			<WishTableRow wishes={mockWish} index={0} formatDate={mockFormatDate} />,
		);
		expect(screen.getByRole('row')).not.toHaveClass('bg-[#DDDD]');

		rerender(
			<WishTableRow wishes={mockWish} index={1} formatDate={mockFormatDate} />,
		);
		expect(screen.getByRole('row')).toHaveClass('bg-[#DDDD]');
	});
});
