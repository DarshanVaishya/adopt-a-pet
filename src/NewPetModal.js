import React from "react";
import PetForm from "./PetForm";
import Modal from "react-modal";

function NewPetModal({ onCancel, onSave }) {
	return (
		<Modal isOpen={true} onRequestClose={onCancel}>
			<h2>New Pet</h2>
			<PetForm onCancel={onCancel} onSave={onSave} />
		</Modal>
	);
}

export default NewPetModal;
