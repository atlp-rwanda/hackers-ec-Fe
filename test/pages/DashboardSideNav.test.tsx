import { render, screen } from '@testing-library/react';
import DashboardSideNav from '../../src/components/DashboardSideNav';
import AllProvider from '../../src/AllProvider';

describe('Dah sidebar components', () => {
	it('render the correct content', () => {
		const otherStyles = 'space-x-12';
		const role = 'SELLER';
		render(
			<AllProvider>
				<DashboardSideNav
					children={<div>Hello World!</div>}
					otherStyles={otherStyles}
					role={role}
				/>
				,
			</AllProvider>,
		);
		expect(screen.getByText('ShopTrove'));
	});
});
