const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce); // route créer une sauce 

router.put('/:id', auth, multer, sauceCtrl.modifySauce); // route modifier une sauce

router.delete('/:id', auth, sauceCtrl.deleteSauce); // route supprimer une sauce

router.get('/:id', auth, sauceCtrl.getOneSauce ); // route prendre une seule sauce

router.get('/',  auth, sauceCtrl.getAllSauce); // route récupérer toutes les sauces

// LIKE ET DISLIKE D'UNE SAUCE => Défini le like ou dislike mis par l'utilisateur. 
router.post("/:id/like", auth, sauceCtrl.rateSauce);

module.exports = router;