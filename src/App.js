import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Guilherme Macrini",
    });

    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`projects/${id}`);

    const repositoryIndex = repository.findIndex((repo) => repo.id === id);

    const newRepository = repository.splice(repositoryIndex, 1);

    setRepository([newRepository]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
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
