import { render } from '@testing-library/react';
import AllProvider from '../../Utils/AllProvider';
import Querries from '../../../src/pages/Admin/Querries';

describe('Querries Page', () => {
	it('should render the Querries page', () => {
		render(
			<AllProvider>
				<Querries />
			</AllProvider>,
		);
	});
});
