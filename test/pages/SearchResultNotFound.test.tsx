import { render, screen } from '@testing-library/react';
import SearchResultNotFound from '../../src/pages/SearchResultNotFound';
import AllProvider from '../Utils/AllProvider';

describe('Search Result Not Found Components', () => {
	it('should render SearchResultNotFound withour error', () => {
		render(
			<AllProvider>
				<SearchResultNotFound />
			</AllProvider>,
		);

		expect(screen.getByText(/No results found/i));
	});
});
