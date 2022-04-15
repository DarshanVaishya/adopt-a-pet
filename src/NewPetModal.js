import React, { useRef, useState } from "react";
import Modal from "react-modal";

function NewPetModal({ onCancel, onSave }) {
	const [name, setName] = useState("");
	const [kind, setKind] = useState("");
	const [photo, setPhoto] = useState(null);
	const photoInput = useRef();

	const updatePhoto = () => {
		const file = photoInput.current?.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => setPhoto(reader.result);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSave({
			name,
			kind,
			photo,
		});
	};

	return (
		<Modal isOpen={true} onRequestClose={onCancel}>
			<h2>New Pet</h2>
			<form className="pet-form" onSubmit={handleSubmit}>
				{photo && <img alt="the pet" src={photo} />}
				<label htmlFor="photo">Photo</label>
				<input type="file" id="photo" ref={photoInput} onChange={updatePhoto} />

				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label htmlFor="kind">Name</label>
				<select
					name="kind"
					id="kind"
					value={kind}
					onChange={(e) => setKind(e.target.value)}
				>
					<option value="" disabled>
						Choose a kind
					</option>
					<option value="cat">Cat</option>
					<option value="dog">Dog</option>
				</select>

				<button type="button" onClick={onCancel}>
					Cancel
				</button>

				<button type="submit">Save</button>
			</form>
		</Modal>
	);
}

export default NewPetModal;
