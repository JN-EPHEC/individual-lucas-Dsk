// Récupération des éléments HTML
const listeUtilisateurs = document.getElementById("liste-utilisateurs");
const formulaireUtilisateur = document.getElementById("form-utilisateur");
const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");

// Fonction pour ajouter un utilisateur dans la liste HTML
function ajouterUtilisateurDansListe(utilisateur) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center mb-2 box"; // style Bulma

    li.textContent = utilisateur.name || `${utilisateur.prenom} ${utilisateur.nom}`;

    // bouton X pour supprimer
    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "X";
    btnSupprimer.className = "btn btn-danger btn-sm";

    btnSupprimer.addEventListener("click", async () => {
        await fetch(`/api/users/${utilisateur.id}`, { method: "DELETE" });
        li.remove(); // supprime juste cet élément sans recharger toute la liste
    });

    li.appendChild(btnSupprimer);
    listeUtilisateurs.appendChild(li);
}

// Fonction pour charger et afficher tous les utilisateurs
async function chargerUtilisateurs() {
    try {
        const res = await fetch("/api/users");
        const utilisateurs = await res.json();

        listeUtilisateurs.innerHTML = ""; // vider la liste au démarrage seulement

        utilisateurs.forEach(utilisateur => ajouterUtilisateurDansListe(utilisateur));
    } catch (err) {
        console.error(err);
    }
}

// Soumission du formulaire → POST
formulaireUtilisateur.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prenom = prenomInput.value.trim();
    const nom = nomInput.value.trim();

    if (!prenom || !nom) return; // sécurité : champs vides

    const nouvelUtilisateur = { prenom, nom };

    try {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nouvelUtilisateur)
        });

        if (res.ok) {
            const utilisateurCree = await res.json();
            ajouterUtilisateurDansListe(utilisateurCree); // ajoute juste le nouvel utilisateur
            formulaireUtilisateur.reset();                // vide le formulaire
        } else {
            console.error("Erreur lors de l'ajout de l'utilisateur");
        }
    } catch (err) {
        console.error(err);
    }
});

// Charger les utilisateurs au démarrage
chargerUtilisateurs();
