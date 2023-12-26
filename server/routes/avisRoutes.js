const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avisController');
const requireAuth = require('../middleware/verifyJWT');

router.route('/new').post(requireAuth,avisController.GiveAvis);
router.route('/:id').get(avisController.getAvisCreche);
router.route('/').get(avisController.getAvis);
router.route('/:id').delete(avisController.deelete);

module.exports = router;
