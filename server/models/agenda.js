const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({

        Dimanche:
            {
                start: {
                    type:String,
                    required:true
                },
                end: {
                    type:String,
                    required:true
                },
            }
        ,

        Lundi:
            {
                start: {
                    type:String,
                    required:true
                },
                end: {
                    type:String,
                    required:true
                }
            }
        ,

        Mardi:
            {
                start: {
                    type:String,
                    required:true
                },
                end: {
                    type:String,
                    required:true
                },
            }
        ,

        Mercredi:
            {
                start: {
                    type:String,
                    required:true
                },
                end: {
                    type:String,
                    required:true
                },
            }
        ,

        Jeudi:
            {
                start: {
                    type:String,
                    required:true
                },
                end: {
                    type:String,
                    required:true
                },
            },


        Vendredi:
            {
                start: {
                    type:String,
                    required:true
                },
                end: {
                    type:String,
                    required:true
                }
            }
        ,

        Samedi:
            {
                start: {
                    type:String,
                    required:true
                },
                end: {
                    type:String,
                    required:true
                }
            }
        ,

    }
);

module.exports= mongoose.model('Agenda', AgendaSchema,'Agenda');