document.addEventListener("DOMContentLoaded", function () {

    const liste = document.getElementById("liste-utilisateurs");
    const formulaire = document.getElementById("form-utilisateur");

    // Charger tous les utilisateurs depuis le backend au démarrage
    async function chargerUtilisateurs() {
        try {
            const response = await fetch("/api/users");
            const users = await response.json();

            liste.innerHTML = ""; // vider la liste au démarrage uniquement

            users.forEach(user => {
                ajouterUtilisateurDansListe(user);
            });

        } catch (error) {
            console.error(error);
        }
    }

    // Ajouter un utilisateur dans la liste HTML
    function ajouterUtilisateurDansListe(user) {
        const li = document.createElement("li");
        li.textContent = user.name; // utilise "name" du backend
        li.classList.add("mb-2", "box"); // style Bulma
        liste.appendChild(li);
    }

    // Gestion du formulaire pour ajouter un utilisateur
    formulaire.addEventListener("submit", async function (e) {
        e.preventDefault();

        const prenom = document.getElementById("prenom").value.trim();
        const nom = document.getElementById("nom").value.trim();

        if (!prenom || !nom) return; // sécurité : champs vides

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prenom, nom })
            });

            if (response.ok) {
                const newUser = await response.json();
                ajouterUtilisateurDansListe(newUser); // <- ajoute juste le nouvel utilisateur
                formulaire.reset();                    // vider le formulaire
            } else {
                console.error("Erreur lors de l'ajout de l'utilisateur");
            }

        } catch (error) {
            console.error(error);
        }
    });

    // Charger les utilisateurs au démarrage
    chargerUtilisateurs();

});
