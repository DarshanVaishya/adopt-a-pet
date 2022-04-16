import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import Modal from "react-modal";
import Pet from "./Pet";
import "./index.css";
import NewPetModal from "./NewPetModal";
import { createPet, deletePet, listPets, updatePet } from "./api";
import EditPetModal from "./EditPetModal";

const App = () => {
	const [pets, setPets] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [currentPet, setCurrentPet] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		listPets()
			.then((pets) => setPets(pets))
			.finally(() => setLoading(false));
	}, []);

	const addPet = (pet) => {
		return createPet(pet).then((newPet) => {
			setPets(pets.concat(newPet));
			setOpen(false);
		});
	};

	const savePet = async (pet) => {
		return updatePet(pet).then((updatedPet) => {
			setPets((pets) =>
				pets.map((pet) => (pet.id !== updatedPet.id ? pet : updatedPet))
			);
			setCurrentPet(null);
		});
	};

	const removePet = async (byePet) => {
		const result = window.confirm(
			`Are you sure you want to adopy ${byePet.name}`
		);
		if (result)
			deletePet(byePet).then(() => {
				setPets((pets) => pets.filter((pet) => pet.id !== byePet.id));
			});
	};

	return (
		<main>
			<h1>Adopt-a-Pet</h1>
			{isLoading ? (
				<div className="loading">Loading...</div>
			) : (
				<>
					<ul>
						{pets.map((pet) => (
							<li key={pet.id}>
								<Pet
									pet={pet}
									onEdit={() => setCurrentPet(pet)}
									onRemove={() => removePet(pet)}
								/>
							</li>
						))}
					</ul>
					<button onClick={() => setOpen(true)}>Add a Pet</button>
				</>
			)}
			{isOpen && (
				<NewPetModal onSave={addPet} onCancel={() => setOpen(false)} />
			)}
			{currentPet && (
				<EditPetModal
					pet={currentPet}
					onCancel={() => setCurrentPet(null)}
					onSave={savePet}
				/>
			)}
		</main>
	);
};

const rootEl = document.querySelector("#root");
Modal.setAppElement(rootEl);

const root = createRoot(rootEl);
root.render(<App />);
