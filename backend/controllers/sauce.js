const Sauce = require('../model/sauce');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    likes: 0,
    dislikes: 0,
    userDisliked: [],
    userLiked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`, // propriété de l'objet requete protocol -> nom d'hote -> nom de fichier (donné par multer)
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file 
    ? {
        ...JSON.parse(req.body.sauce), //on modifier les données et on ajoute la nouvelle image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId; //suppression du champ userId envoyé par le client
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
      } else {
        Sauce.updateOne( //on applique les paramètres de sauceObject
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Sauce Modifié !' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// Fonction qui permet de liker ou disliker une sauce . On l'exporte afin de pouvoir l'utiliser dans d'autres fichiers. //
exports.rateSauce = (req, res, next) => {
  // Utilisation de la méthode findOne en lui passant l'objet de comparaison. Ici on veut que l'id de la sauce soit le même que le paramètre de requête. //
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Si l'user n'est pas inclus dans les users ayant déjà liké une sauce ET qu'il met un like. //
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        // On met la sauce à jour. //
        Sauce.updateOne(
          { _id: req.params.id },
          // On incrémente les likes de 1 et on push l'user qui a liké dans l'array usersLiked. //
          { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
        )
          .then(() =>
            // Si la sauce est liké envoi du code 200 et du message correspondant. //
            res.status(200).json({ message: 'Super! Cette sauce a été likée.' })
          )
          // S'il y a une erreur envoi du code 400 et de l'erreur. //
          .catch((error) => res.status(400).json({ error }));
      } else if (
        // Si l'user a déjà liké la sauce et qu'il la re-like (donc repasse à 0). //
        sauce.usersLiked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        // Mise à jour de la sauce en décrémentant les likes et en retirant l'user de l'array usersLiked. //
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          // Si le like est retiré envoi du code 200 et du message correspondant. //
          .then(() => res.status(200).json({ message: 'Aucun choix saisi.' }))
          // S'il y a une erreur envoi du code 400 et de l'erreur. //
          .catch((error) => res.status(400).json({ error }));
      } else if (
        // Si l'user n'a pas encore dislike ET qu'il dislike. //
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        // Mise à jour de la sauce en incrémentant les dislikes et en ajoutant l'user à l'array usersDisliked. //
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } }
        )
          // Si le dislike est ajouté envoi du code 200 et du message correspondant. //
          .then(() =>
            res
              .status(200)
              .json({ message: 'Oups! Cette sauce a été dislikée.' })
          )
          // S'il y a une erreur envoi du code 400 et de l'erreur. //
          .catch((error) => res.status(400).json({ error }));
      } else if (
        // Si l'user a déjà disliké la sauce et qu'il la re-dislike (donc repasse à 0). //
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        // Mise à jour de la sauce en décrémentant les dislikes et en retirant l'user de l'array usersDisliked. //
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          // Si le dislike est retiré envoi du code 200 et du message correspondant. //
          .then(() => res.status(200).json({ message: 'Aucun choix saisi.' }))
          // S'il y a une erreur envoi du code 400 et de l'erreur. //
          .catch((error) => res.status(400).json({ error }));
      } else {
        // Si une erreur est rencontré envoi du code 400 et du message correspondant. //
        return res
          .status(400)
          .json({ message: "L'opération n'a pas pu être effectuée." });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
