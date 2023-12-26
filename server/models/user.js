const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String, required: [true, 'Please provide a name.'],
    }, prenom: {
        type: String, required: [true, 'Please provide a name.'],
    }, username: {
        type: String,
        required: [true, 'Please provide a username.'],
    }, email: {
        type: String,
        required: [true, 'Please provide an email.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email.',],
    }, password: {
        type: String, required: [true, 'Please provide a password.'],
    }, adresse: {
        type: String, required: [true, 'Please provide an adresse.'],
    }, telephone: {
        type: String, length: 8, required: [true, 'Please provide an telephone.'],
    }, wilaya: {
        type: String, required: [true, 'Please provide an wilaya.'],
    }, commune: {
        type: String, required: [true, 'Please provide an commune.'],
    }, codePostal: {
        type: String, required: [true, 'Please provide an codePostal.'],
    }, sexe: {
        type: String,
        enum: ['HOMME', 'FEMME']
    }, role: {
        type: String, enum: ['parent', 'proprietaire', 'admin'], default: 'parent'
    },
    Enfant: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Enfant'
    }],
    confirmationCode: {
        type: String,
        unique: true
    },
    confirmationToken: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },crechesauvgardes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Creche'
    }],
    liste_creches: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Creche'
    }],
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', userSchema)
