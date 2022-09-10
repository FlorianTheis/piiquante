const express = require('express');
const mongoose = require('mongoose'); // importation de mongoose
const app = express(); // crée application express

const sauceRoutes = require('./route/sauce');
const userRoutes = require('./route/user');

 // importation du schéma crée dans model/sauce.js dans app.js 

mongoose.connect(
    'mongodb+srv://sydaima:MDQEVHhD8o7c8TNg@cluster0.qvvkciy.mongodb.net/?retryWrites=true&w=majority',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
  )

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use(express.json()); // intercepte toutes les requetes qui contiennent du json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Ces headers permettent :
// d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

// middleware est une fonction dans une app express qui reçoit la requete et la réponse, qui les gère et qui peut passer l'exécution a une prochaine fonction
