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

module.exports = router;