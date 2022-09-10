const bcrypt = require('bcrypt');


const User = require('../model/user');



exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  // fonction pour hash un mot de pass avec le package bcrypt
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}) )
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// fonction signup qui va cripté le MDP , prendre ce MDP crypté va créee un nouveau user avec ce MDP cripté et l'adresse mail passé dans le corp de la requete
// et va enregistré cet utilisateur dans la base de données.

exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if (user === null) {
        res.status(401).json({message: 'Paire identifiant/mot de passe incorrect'});
    } else {
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                res.status(401).json({ message : 'Paire identifiant/mot de passe incorrecte'})
            } else {
                res.status(200).json({
                    userId: user._id,
                    token: 'TOKEN'
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        })
    }
  })
  .catch(error => {
    res.status(500).json({ error });
  })
};

// fonction login qui va vérifier si notre utilisateur est enregistré en base de données puis qui va vérifier le MDP transmis par le client 
// et qui sait gérer les différents cas d'erreur, (execution requete au server) , (erreur vérification MDP avec bcrypt)
// ainsi que les cas ou l'utilisateur n'existe pas ou les cas ou le MDP est incorrecte.