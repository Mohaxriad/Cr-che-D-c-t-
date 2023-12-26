const mongoose = require('mongoose');

const CrecheSchema = new mongoose.Schema({
    nomProprietaire: {
        type: String,
    },
    adrCreche: {
        type: String,
    },
    tel: {
        type: String,
    },
    email: {
        type: String,
    },
    location: {
        coordinates:
            {
                type: [Number],
            },
        type:{
            type:String,
            default:'Point'
        }
    },
    wilaya: {
        type: String,
    },
    commune: {
        type: String,
    },
    url: {
        type: String,
    },
    typeEtablissement: {
        type: String,
        enum :['Etatique','Prive']
    },
    typeAccueil: {
        type: String,
        enum :['Regulier','Occasionnel']
    },
    pedagogie: {
        type: String,
        enum :['Reggio Emilia','Montessori','Freinet','Steiner-Waldorf','Faber et Mazlish','Pikler-Loczy','Snoezelen','Loczy','Emmi Pikler','Snoezelen']
    },
    langeSupp:{
        type: String,
        enum :['Aucun','Anglais','Francais','Francais et Anglais']
    },
    capacite: {
        type: Number,
    },
    serviesUp:{
        type: [String],
        enum :['Transport','Alimentation','Medecin','Enfants-Handicapes','Classes-Preparatoires']
        
    },
    placesDispo: {
        type: Number,
    },
    ageMin: {
        type: Number,
    },
    ageMax: {
        type: Number,
    },
    // on va secifier les jours et les horaires de debut et de fin
    agenda: {

        Dimanche:
            {
                start: {
                    type:String,

                },
                end: {
                    type:String,
                },
            }
        ,

        Lundi:
            {
                start: {
                    type:String,

                },
                end: {
                    type:String,

                }
            }
        ,

        Mardi:
            {
                start: {
                    type:String,

                },
                end: {
                    type:String,
                },
            }
        ,

        Mercredi:
            {
                start: {
                    type:String,
                },
                end: {
                    type:String,
                },
            }
        ,

        Jeudi:
            {
                start: {
                    type:String,
                },
                end: {
                    type:String,
                },
            },


        Vendredi:
            {
                start: {
                    type:String,
                },
                end: {
                    type:String,
                }
            }
        ,

        Samedi:
            {
                start: {
                    type:String,

                },
                end: {
                    type:String,

                }
            }
        ,

    },
    tarifs: {
        type: Number,
    },
    Mixite: {
        type: String,
        enum :['Les deux','Filles uniquement','Garcons uniquement']
    },
    nomCreche: {
        type: String,
    },
    description: {
        type: String,
    },
    NoteEvaluationTotal:{
        type:Number,
        default: 0
    },
    Images: [
        {
            url: String, // The URL or path of the image
        }
    ],
    Proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});
CrecheSchema.index({location:"2dsphere"})

module.exports = Creche = mongoose.model('Creche', CrecheSchema);