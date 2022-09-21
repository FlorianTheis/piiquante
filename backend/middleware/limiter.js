/************************************** MIDDLEWARE DE LIMITATION DE REQUETES **************************************/

// Importation du module express-rate-limit destiné à limiter le nombre de requête venant d'une même adresse IP afin d'empêcher les attaques par force brute. //
const rateLimit = require('express-rate-limit').default;

// Création d'une constante afin de définir le nombre de requête maximale. //
const limiter = rateLimit({
  // windowMs est la valeur du blocage en millisecondes. Dans notre cas cela équivaut à 1h par mesure de sécurité. //
  windowMs: 60 * 60 * 1000,
  // Max représente le nombre limite de requête avant que le module ne bloque l'envoi pendant 5min. //
  max: 5,
  // Envoi d'un message destiné à informer l'utilisateur. //
  message:
    ' De trop nombreuses requêtes ont été envoyées par cette adresse IP. Veuillez réessayer dans 1h. ',
});

module.exports = { limiter };
