import { fireEvent, render, screen } from '@testing-library/react';
import { DynamicData } from '../../../../../src/@types/DynamicData';
import WishTable from '../../../../../src/components/wishes/Seller/WishlistTable';

const mockWishes: DynamicData[] = [
	{
		product: {
			name: 'Mongo',
			price: 31,
			images: ['image1', 'image2', 'image3', 'image4'],
			discount: 0,
			quantity: 290,
			expiryDate: '2324-04-20T00:00:00.000Z',
		},
	},
];

describe('WishTable', () => {
	it('should render the WishTable component correctly', () => {
		const handlePageChange = vi.fn();
		render(
			<WishTable
				wishes={mockWishes}
				pageCount={1}
				handlePageChange={handlePageChange}
			/>,
		);

		expect(screen.getByText('Wishlist')).toBeInTheDocument();
		expect(screen.getByText('Mongo')).toBeInTheDocument();
		expect(screen.getByAltText('product_images')).toBeInTheDocument();
	});

	it('should call handlePageChange when page is changed', () => {
		const handlePageChange = vi.fn();
		render(
			<WishTable
				wishes={mockWishes}
				pageCount={2}
				handlePageChange={handlePageChange}
			/>,
		);

		const nextButton = screen.getByLabelText('Next page');
		fireEvent.click(nextButton);

		expect(handlePageChange).toHaveBeenCalled();
	});
});
