const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({

  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creche: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creche'
  },

  Proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  date: {
    type: Date,
    required:true
  },

  heure:{
    type: String,
    required:true
  },

  isRefused:{
    type: Boolean,
    default: false
  },

  isConfirmed:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('RendezVous', rendezVousSchema,'RendezVous');
