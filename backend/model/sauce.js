const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  manufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
  heat: { type: Number },
});

module.exports = mongoose.model('Sauce', sauceSchema); // exportation du model correspondant

// La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.

// La méthode  model  transforme ce modèle en un modèle utilisable.
