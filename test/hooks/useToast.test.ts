import useToast from '../../src/hooks/useToast';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
		warning: vi.fn(),
	},
}));

describe('useToast', () => {
	it('should call toast.success with the correct message', () => {
		const { showSuccessMessage } = useToast();
		showSuccessMessage('Success message');
		expect(toast.success).toHaveBeenCalledWith('Success message');
	});

	it('should call toast.error with the correct message', () => {
		const { showErrorMessage } = useToast();
		showErrorMessage('Error message');
		expect(toast.error).toHaveBeenCalledWith('Error message');
	});
	it('should call toast.warning with the correct message', (message: string) => {
		const { showWorningMessage } = useToast();
		showWorningMessage(message);
		expect(toast.warning).toHaveBeenCalledWith(message);
	});
});
