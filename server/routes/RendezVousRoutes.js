const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const rendezVousController =require('../controllers/RendezVousController');
const verifyJWT = require('../middleware/verifyJWT');
router.use(verifyJWT);
router.route("/create").post(rendezVousController.createRendezVous);

router.route("/parent").get(rendezVousController.getParentRdvs);
router.route("/proprio").get(rendezVousController.getProprioRdvs);

// confirm a Reservation
router.route("/confirmer/:id").put(rendezVousController.confirmerRendezVous);

// annuler Reservation
router.route("/annuler/:id").delete(rendezVousController.annulerRendezVous);




module.exports = router;