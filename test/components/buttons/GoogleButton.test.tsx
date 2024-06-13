import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GoogleButton from '../../../src/components/buttons/GoogleButton';

describe('GoogleButton component', () => {
	it('should render a google button', () => {
		render(<GoogleButton />);
		const button = screen.getByRole('button', { name: /google/i });
		expect(button).toBeInTheDocument();
	});
});
