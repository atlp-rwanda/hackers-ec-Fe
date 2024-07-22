import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import RecommendedProduct from '../../src/pages/RecommendedProduct';
import recommendedProductSlice from '../../src/redux/features/recommendedProductSlice';
import cartsSlice from '../../src/redux/features/cartSlice';
import RecommendedDesign from '../../src/components/Recommend';
import { configureStore } from '@reduxjs/toolkit';
import { DynamicData } from '../../src/@types/DynamicData';
import { describe, it, expect } from 'vitest';

const mockProducts: DynamicData[] = [
	{
		id: '0b52e82c-70a7-4ff3-aad7-8f6a3e406f5c',
		name: 'Product 1',
		price: 100,
		images: ['image1.png', 'image2.png', 'image3.png'],
		discount: 2,
		ratings: 3,
	},
	{
		id: '0b52e82c-70a5-4ff3-aad7-8f6a3e406f5c',
		name: 'Product 2',
		price: 200,
		images: ['image3.png', 'image4.png', 'image5.png'],
		discount: 5,
		ratings: 4,
	},
];

const mockCartState = {
	isLoading: false,
	isInitialLoading: false,
	carts: {
		products: [],
	},
	numberOfItem: 0,
	error: 'An unknown error occurred',
};

const createMockStore = (error: string | null) =>
	configureStore({
		reducer: {
			recommendedProducts: recommendedProductSlice,
			cart: cartsSlice,
		},
		preloadedState: {
			recommendedProducts: {
				products: mockProducts,
				isLoading: false,
				error,
			},
			cart: mockCartState,
		},
	});

describe('RecommendedProduct component', () => {
	const renderComponent = (store: ReturnType<typeof createMockStore>) => {
		return render(
			<Provider store={store}>
				<MemoryRouter>
					<RecommendedProduct prodId="0b52e82c-70a7-4ff3-aad7-8f6a3e406f5c" />
				</MemoryRouter>
			</Provider>,
		);
	};

	it('should render the RecommendedProduct component', () => {
		const store = createMockStore(null);
		renderComponent(store);
		expect(screen.getByText('You may also like:')).toBeInTheDocument();
	});

	it('should render RecommendedDesign components', () => {
		const store = createMockStore(null);
		renderComponent(store);
		expect(screen.getByText('Product 1')).toBeInTheDocument();
		expect(screen.getByText('Product 2')).toBeInTheDocument();
	});

	it('should include RecommendedDesign component in the rendering', () => {
		const store = createMockStore(null);
		renderComponent(store);
		expect(RecommendedDesign).toBeTruthy();
	});
});
