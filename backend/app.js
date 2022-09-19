// importation du package Express
const express = require('express');
// importation du package Mongoose (mongoDB)
const mongoose = require('mongoose'); 
// importation de path qui va servir à définir les chemins.
const path = require('path');

const app = express(); // crée application express

const sauceRoutes = require('./route/sauce');
const userRoutes = require('./route/user');

require("dotenv").config(); // importation du module dotenv (pour le fichier envrionement)


 // importation du schéma crée dans model/sauce.js dans app.js 



// le fichier env à pour but de stockés les données sensibles pour que personne ne puisse accéder à la base de données, c'est une sécurité
mongoose.connect(process.env.dbID) //dbID étant la variable contenant le lien de connection de mongoDB qui se trouve dans le fichier .env

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use(express.json()); // intercepte toutes les requetes qui contiennent du json

// qui peut acceder à l'API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader( // les headers autorisés
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader( // les méthodes possibles
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Ces headers permettent :
// d'accéder à notre API depuis l'adresse http://localhost:4200
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).

// gestions des principales routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;


