// main.js

// Effectuer une requête à l'API du back-end Express
fetch('http://localhost:3000/api/message') // URL de l'API Express
    .then(response => response.json())  // Convertir la réponse en JSON
    .then(data => {
        // Afficher le message récupéré dans l'élément HTML
        document.getElementById('api-response').innerText = data.message;
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        document.getElementById('api-response').innerText = 'Une erreur est survenue.';
    });
