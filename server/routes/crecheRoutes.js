const express = require('express');
const router = express.Router();
const crecheController = require('../controllers/crecheController');
const verifyJWT = require('../middleware/verifyJWT');
const reauirePropriateRole = require('../middleware/autherization');

router.use(verifyJWT);
//the roles that can access to this route are admin and proprietaire
router.use(reauirePropriateRole(['admin', 'proprietaire']));

router.route('/create').post(crecheController.createCreche);
router.route('/delete/:id').delete(crecheController.deleteCreche);
router.route('/update/').put(crecheController.updateCreche);




module.exports = router;