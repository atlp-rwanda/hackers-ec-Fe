import { it, expect, describe, beforeAll, afterAll, vi } from 'vitest';
import SellerDashboard from '../../../../src/pages/dashboard/seller/SellerDashboard';
import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import AllProvider from '../../../Utils/AllProvider';
import { db } from '../../../mock/db';
import { DynamicData } from '../../../../src/@types/DynamicData';
import { http, HttpResponse } from 'msw';
import { server } from '../../../mock/server';
import { ResizeObserver } from '../../../mock/localStorage';

global.ResizeObserver = ResizeObserver;

vi.mock('chart.js', () => ({
	Chart: vi.fn(),
}));

vi.mock('chart.js', async (importOriginal) => {
	const actual = await importOriginal();
	return {
		// @ts-expect-error ignore
		...actual,
	};
});

describe('Seller dashboard', () => {
	let sales: DynamicData[] = [];
	const statistics: DynamicData[] = [];

	beforeAll(() => {
		[1, 2, 3].forEach(() => {
			const sale = db.sales.create();
			sales.push(sale);
		});
		statistics.push(db.stats.create());
	});

	afterAll(() => {
		const salesIds = sales.map((sale) => sale.id);
		const statisticIds = statistics.map((stats) => stats.id);
		if (salesIds.length > 0) {
			db.sales.deleteMany({ where: { id: { in: salesIds } } });
		}
		if (statistics.length > 0) {
			db.stats.deleteMany({ where: { id: { in: statisticIds } } });
		}
		sales = [];
		statistics.length = 0;
	});

	it('should render with loader removed', async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/sales`, () =>
				HttpResponse.json({
					data: sales,
				}),
			),
			http.get(`${import.meta.env.VITE_API_BASE_URL}/stats`, () =>
				HttpResponse.json({
					data: { ...statistics[0] },
				}),
			),
		);

		render(<SellerDashboard />, { wrapper: AllProvider });

		const loader = screen.getByRole('progressbar');
		expect(loader).toBeInTheDocument();

		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();

		screen.debug();

		expect(await screen.getByLabelText('container')).toBeInTheDocument();
	});
});
