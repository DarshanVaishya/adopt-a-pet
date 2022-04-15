import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import Modal from "react-modal";
import Pet from "./Pet";
import "./index.css";
import NewPetModal from "./NewPetModal";

const App = () => {
	const [pets, setPets] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		async function getData() {
			try {
				setLoading(true);
				const res = await fetch("http://localhost:3001/pets");
				const data = await res.json();
				setPets(data);
				setLoading(false);
			} catch (e) {
				setLoading(false);
			}
		}
		getData();
	}, []);

	const addPet = async (data) => {
		data.id = Math.random();
		setPets(pets.concat(data));
		setOpen(false);
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
								<Pet pet={pet} />
							</li>
						))}
					</ul>
					<button onClick={() => setOpen(true)}>Add a Pet</button>
				</>
			)}
			{isOpen && (
				<NewPetModal onSave={addPet} onCancel={() => setOpen(false)} />
			)}
		</main>
	);
};

const rootEl = document.querySelector("#root");
Modal.setAppElement(rootEl);

const root = createRoot(rootEl);
root.render(<App />);
