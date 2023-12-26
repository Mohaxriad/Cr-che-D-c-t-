const express = require('express');
const router = express.Router();
const enfantController = require('../controllers/enfantController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
router.post('/creer', enfantController.creeEnfant);
router.delete('/delete/:id', enfantController.supprimeEnfant);
router.post('/ajouter/:id', enfantController.ajouteCreche);
router.put('/modifier/:id', enfantController.modifieEnfant);

module.exports = router;
