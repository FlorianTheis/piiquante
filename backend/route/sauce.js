const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', sauceCtrl.createSauce); // route créer une sauce 

router.put('/:id', sauceCtrl.modifySauce); // route modifier une sauce

router.delete('/:id', sauceCtrl.deleteSauce); // route supprimer une sauce

router.get('/:id', sauceCtrl.getOneSauce ); // route prendre une seule sauce

router.get('/', sauceCtrl.getAllSauce); // route récupérer toutes les sauces

module.exports = router;