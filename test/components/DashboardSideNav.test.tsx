import { render, screen } from '@testing-library/react';
import DashboardSideNav from '../../src/components/DashboardSideNav';
import AllProvider from '../Utils/AllProvider';

test('renders DashboardSideNav component', () => {
	const role = 'Admin';
	const otherStyles = 'custom-styles';

	render(
		<AllProvider>
			,
			<DashboardSideNav role={role} otherStyles={otherStyles}>
				<div>Side bar</div>
			</DashboardSideNav>
		</AllProvider>,
	);

	const websiteNameElement = screen.getByText('ShopTrove');
	expect(websiteNameElement).toBeInTheDocument();
});
