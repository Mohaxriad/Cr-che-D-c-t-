const mongoose = require('mongoose');

const AvisSchema = new mongoose.Schema({
    commentaire: [
        {
            type: String,
        }
    ],
    IdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    NameUser: {
        type: String,

    },

    IdCreche: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Creche',
    },
    DateCreation: {
        type: Date,
        default: Date.now
    },
    NoteEvaluation : {
        type: Number,
        default: -1
    }
});

module.exports= mongoose.model('Avis', AvisSchema,'Avis');