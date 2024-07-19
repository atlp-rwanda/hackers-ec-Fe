import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import NotificationSkeleton from '../../../src/components/cards/NotificationSkeleton';

describe('Notification Skeleton Component', () => {
	it('should render a skeleton', () => {
		render(<NotificationSkeleton />);
		expect(screen.getByLabelText('skeleton')).toBeInTheDocument();
	});
});
