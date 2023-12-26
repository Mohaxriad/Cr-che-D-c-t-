const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creche: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creche'
  },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  enfant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enfant'
  },
  dateDebut: {
    type: Date,
    default: Date.now
  },
  dateFin: {
    type: Date,
    default: Date.now
  },

  isCancelled:{
    type: Boolean,
    default: false
  },

  isConfimed:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Reservation', reservationSchema,'Reservation');
