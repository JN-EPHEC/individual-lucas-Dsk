document.addEventListener("DOMContentLoaded", () => {
    const listeUtilisateurs = document.getElementById("liste-utilisateurs");
    const formulaireUtilisateur = document.getElementById("form-utilisateur");
    const prenomInput = document.getElementById("prenom");
    const nomInput = document.getElementById("nom");

    const API_URL = "/api/users"; // adapté à ton serveur

    // Ajouter un utilisateur dans la liste HTML
    function ajouterUtilisateurDansListe(utilisateur) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center mb-2 box";
        li.textContent = `${utilisateur.prenom} ${utilisateur.nom}`;

        const btnSupprimer = document.createElement("button");
        btnSupprimer.textContent = "X";
        btnSupprimer.className = "btn btn-danger btn-sm";

        btnSupprimer.addEventListener("click", async () => {
            if (!utilisateur.id) return console.error("ID invalide pour suppression !");
            try {
                const res = await fetch(`${API_URL}/${utilisateur.id}`, { method: "DELETE" });
                if (res.ok) li.remove();
                else {
                    const errorData = await res.json();
                    console.error("Erreur suppression :", errorData);
                }
            } catch (err) {
                console.error(err);
            }
        });

        li.appendChild(btnSupprimer);
        listeUtilisateurs.appendChild(li);
    }

    // Charger tous les utilisateurs
    async function chargerUtilisateurs() {
        try {
            const res = await fetch(API_URL);
            const utilisateurs = await res.json();
            listeUtilisateurs.innerHTML = "";
            utilisateurs.forEach(utilisateur => ajouterUtilisateurDansListe(utilisateur));
        } catch (err) {
            console.error(err);
        }
    }

    // Soumission du formulaire
    formulaireUtilisateur.addEventListener("submit", async (e) => {
        e.preventDefault();
        const prenom = prenomInput.value.trim();
        const nom = nomInput.value.trim();
        if (!prenom || !nom) return;

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prenom, nom })
            });
            if (res.ok) {
                const utilisateurCree = await res.json();
                ajouterUtilisateurDansListe(utilisateurCree);
                formulaireUtilisateur.reset();
            } else {
                const errorData = await res.json();
                console.error("Erreur ajout :", errorData);
            }
        } catch (err) {
            console.error(err);
        }
    });

    // Initialisation
    chargerUtilisateurs();
});