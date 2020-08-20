import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);
  const [title, setTitle] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      setRepository(response.data);
    });
  }, [repository]);

  async function handleAddRepository() {
    const response = await api.post("projects", {
      title: title,
      owner: owner,
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
      <input
        required
        placeholder="Digite o título do projeto"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        required
        placeholder="Digite o dono do projeto"
        value={owner}
        onChange={(event) => setOwner(event.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
