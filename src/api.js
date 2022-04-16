const BASE_URL = "http://localhost:3001/pets";

const handleErrors = (res) => {
	if (!res.ok) {
		return res.json().then((error) => {
			throw error;
		});
	}

	return res;
};

export const listPets = () => {
	return fetch(BASE_URL).then((res) => res.json());
};

export const createPet = (pet) => {
	return fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(pet),
	})
		.then(handleErrors)
		.then((res) => res.json());
};

export const updatePet = (pet) => {
	return fetch(`${BASE_URL}/${pet.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(pet),
	})
		.then(handleErrors)
		.then((res) => res.json());
};

export const deletePet = (pet) => {
	return fetch(`${BASE_URL}/${pet.id}`, {
		method: "DELETE",
	})
		.then(handleErrors)
		.then((res) => res.json());
};
