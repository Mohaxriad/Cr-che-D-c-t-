const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const reservationController =require('../controllers/ReservationController');
const verifyJWT = require('../middleware/verifyJWT');
router.use(verifyJWT);

router.route("/create").post(reservationController.createReservation);

router.route("/parent").get(reservationController.getParentReservations);
router.route("/proprio").get(reservationController.getProprioReservations);

// confirm a Reservation
router.route("/confirmer/:id").put(reservationController.confirmerReservation);

// annuler Reservation
router.route("/annuler/:id").delete(reservationController.annulerReservation);




module.exports = router;