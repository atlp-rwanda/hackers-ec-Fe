import RecommendedDesign from '../../src/components/Recommend';
import { DynamicData } from '../../src/@types/DynamicData';
import AllProvider from '../Utils/AllProvider';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const data: DynamicData = {
	id: '0b52e82c-70a7-4ff3-aad7-8f6a3e406f5c',
	name: 'Product 1',
	price: 100,
	images: ['image1.png', 'image2.png', 'image3.png'],
	discount: 2,
	ratings: 3,
};

describe('Recommended products design', () => {
	const renderComponent = () => {
		return render(
			<AllProvider>
				<RecommendedDesign item={data} />
			</AllProvider>,
		);
	};

	it('should renders component without crashing', () => {
		renderComponent();
		expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
	});

	it('should render product props', () => {
		renderComponent();
		const imgElement = screen.getByAltText('card_profile');
		expect(imgElement).toHaveAttribute('src', 'image1.png');
		expect(screen.getByText('3 ratings')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText(/RWF/)).toBeInTheDocument();
	});

	it('should render the discount badge if discount is greater than 0', () => {
		renderComponent();
		expect(screen.getByText(/2 %/)).toBeInTheDocument();
	});

	it('should render the product name shortened if length is more than 20 characters', () => {
		const longNameProduct = {
			...data,
			name: 'This is a very long product name that exceeds twenty characters',
		};
		render(
			<AllProvider>
				<RecommendedDesign item={longNameProduct} />
			</AllProvider>,
		);
		expect(screen.getByText('This is a very long ...')).toBeInTheDocument();
	});
});
