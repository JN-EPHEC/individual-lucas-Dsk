import { useEffect, useState } from "react";

type User = {
  id: number;
  prenom: string;
  nom: string;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    fetch("http://91.134.138.136:3000/api/users")
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Erreur HTTP: " + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        setUsers(data);
        setLoading(false);
      })
      .catch(function (err) {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      <ul>
        {users.map(function (user) {
          return (
            <li key={user.id}>
              {user.prenom} {user.nom}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;