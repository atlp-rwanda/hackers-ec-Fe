import { render } from '@testing-library/react';
import AllProvider from '../../Utils/AllProvider';
import SingleQuerries from '../../../src/pages/Admin/SingleQuerries';

describe('Querries Page', () => {
	it('should render the SingleQuery page', () => {
		render(
			<AllProvider>
				<SingleQuerries />
			</AllProvider>,
		);
	});
});
