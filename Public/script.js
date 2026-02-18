const listeUtilisateurs = document.getElementById("liste-utilisateurs");
const formulaireUtilisateur = document.getElementById("form-utilisateur");

const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");
const telephoneInput = document.getElementById("telephone");

function ajouterUtilisateurDansListe(utilisateur) {
    const li = document.createElement("li");
    li.className = "box mb-2 is-flex is-justify-content-space-between is-align-items-center";

    li.textContent = `${utilisateur.prenom} ${utilisateur.nom} - ${utilisateur.telephone}`;

    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "X";
    btnSupprimer.className = "button is-danger is-small";

    btnSupprimer.addEventListener("click", async () => {
        await fetch(`/api/users/${utilisateur.id}`, { method: "DELETE" });
        li.remove();
    });

    li.appendChild(btnSupprimer);
    listeUtilisateurs.appendChild(li);
}

async function chargerUtilisateurs() {
    try {
        const res = await fetch("/api/users");
        const utilisateurs = await res.json();
        listeUtilisateurs.innerHTML = "";
        utilisateurs.forEach(utilisateur => ajouterUtilisateurDansListe(utilisateur));
    } catch (err) {
        alert("Erreur lors du chargement des utilisateurs");
    }
}

formulaireUtilisateur.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prenom = prenomInput.value.trim();
    const nom = nomInput.value.trim();
    const telephone = telephoneInput.value.trim();

    const telRegex = /^0[1-9][0-9]{7,8}$/;
    if (!prenom || !nom || !telephone) {
        alert("Tous les champs sont obligatoires");
        return;
    }

    if (!telRegex.test(telephone)) {
        alert("Format téléphone invalide");
        return;
    }

    try {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prenom, nom, telephone })
        });

        const data = await res.json();
        if (!res.ok) {
            alert(data.message || "Erreur serveur");
            return;
        }

        ajouterUtilisateurDansListe(data);
        formulaireUtilisateur.reset();
    } catch (err) {
        alert("Erreur réseau");
    }
});

chargerUtilisateurs();
