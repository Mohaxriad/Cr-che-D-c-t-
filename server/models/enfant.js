const mongoose = require('mongoose');

const EnfantSchema = new mongoose.Schema({
    nom : {
        type: String,
        required: true

    },
    age : {
        type: Number,
        required: true
    },
    Parent : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Creche : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creche'
    },
    sexe : {
        type: String,
        enum: ['Garcon', 'Fille']
    },
    prenom : {
        type: String,
        required: true
    }
}
);

module.exports = Enfant = mongoose.model('Enfant', EnfantSchema);