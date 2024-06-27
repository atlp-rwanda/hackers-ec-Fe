import React, { useState } from 'react';
import Modal from 'react-modal';

interface DeleteConfirmationModalProps {
	onDelete: () => void;
	onCancel?: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
	onDelete,
	onCancel,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const handleDelete = () => {
		onDelete();
		closeModal();
	};

	return (
		<>
			<button onClick={openModal}>Delete Product</button>
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				contentLabel="Delete Confirmation"
				ariaHideApp={false}
			>
				<h2>Delete Product</h2>
				<p>Are you sure you want to delete this product?</p>
				<div>
					<button onClick={handleDelete}>Confirm</button>
					<button onClick={onCancel || closeModal}>Cancel</button>
				</div>
			</Modal>
		</>
	);
};

export default DeleteConfirmationModal;
