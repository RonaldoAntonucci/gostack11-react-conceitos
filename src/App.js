import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [reposirotires, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      })
      .then((response) =>
        setRepositories((prevReps) => [...prevReps, response.data])
      );
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() =>
      setRepositories((prevReps) => {
        const newReps = [...prevReps];

        const repIndex = prevReps.findIndex((rep) => rep.id === id);

        newReps.splice(repIndex, 1);

        return newReps;
      })
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {reposirotires.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
