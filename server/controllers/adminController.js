// the admin can get all the users and all the avis 
// and he can delete a user or an avis
const User = require('../models/user')
const Avis = require('../models/Avis')
const Enfant = require('../models/enfant')
const Creche = require('../models/creche')
const asyncHandler = require('express-async-handler')
const mongoose = require("mongoose");
const {stringify} = require("nodemon/lib/utils");


// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const Listusers = await User.find({})
    let users = [];
    for (let i = 0; i < Listusers.length; i++) {
        const user = Listusers[i]
        users.push({ id: user._id, email: user.email, username : user.username, role : user.role})
    }
    res.json(users)
})


// @desc    Get all avis
// @route   GET /api/admin/avis
// @access  Private/Admin
const getAvis = asyncHandler(async (req, res) => {
    const Listavis = await Avis.find({})
    let avis = [];
    for (let i = 0; i < Listavis.length; i++) {
        const user = await User.findById(Listavis[i].IdUser)
        const username = user.nom + ' ' + user.prenom
        const creche = await Creche.findById(Listavis[i].IdCreche)
        if (creche) {
            avis.push({ id: Listavis[i]._id, username: username, creche: creche.nomCreche, note: Listavis[i].note, comment: Listavis[i].commentaire })
        }
        else {
            avis.push({ id: Listavis[i]._id, username: username, creche: 'Avis Site', note: Listavis[i].note, comment: Listavis[i].commentaire[0] })
        }
    }
    console.log (avis)

    res.json(avis)
})


// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.deleteOne();
        await Avis.deleteMany({ IdUser: req.params.id })
        await Enfant.deleteMany({ Parent: req.params.id })
        await Creche.deleteMany({ Proprietaire: req.params.id })
        res.json({ message: 'User removed' })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    Delete an avis
// @route   DELETE /api/admin/avis/:id
// @access  Private/Admin
const deleteAvis = asyncHandler(async (req, res) => {
    const avis = await Avis.findById(req.params.id)
    if (avis) {
        await avis.deleteOne()
        res.json({ message: 'Avis removed' })
    }
    else {
        res.status(404)
        throw new Error('Avis not found')
    }
})


// @desc    Get all creches
// @route   GET /api/admin/creches
// @access  Private/Admin
const getCreches = asyncHandler(async (req, res) => {
    let Listcreches = await Creche.find({})
    let creches = [];
    for (let i = 0; i < Listcreches.length; i++) {
        const user = await User.findById(Listcreches[i].Proprietaire)
        if (!user) {
            creches.push({nurseryname : Listcreches[i].nomCreche , email: Listcreches[i].email , ownername: Listcreches[i].nomProprietaire ,id: Listcreches[i]._id , idProprietaire: 'preset' })
            continue;
        }
        const ownername= user.nom+''+user.prenom
        creches.push({nurseryname : Listcreches[i].nomCreche , email: Listcreches[i].email , ownername: ownername ,id: Listcreches[i]._id , idProprietaire: Listcreches[i].Proprietaire })
    }
    res.json(creches)
})


// @desc    Delete a creche
// @route   DELETE /api/admin/creches/:id
// @access  Private/Admin
const deleteCreche = asyncHandler(async (req, res) => {
        const creche = await Creche.findOne({_id: req.params.id});
    if (creche) {
        const user = await User.findById(req.user.id);
        //liste_creches is an array of object ids so we need to convert the id of the creche to an object id
        const crecheId =await new mongoose.Types.ObjectId(req.params.id);
        // remove the creche from the user's list of creches and save the user
        user.liste_creches.pull(crecheId);
        await user.save();
        await creche.deleteOne();
        res.json({ message: 'Creche removed' })
    }
    else {
        res.status(404)
        throw new Error('Creche not found')
    }
})


// @desc    Get stats
// @route   GET /api/admin/
// @access  Private/Admin
const stats = asyncHandler(async (req, res) => {
    const nbUsers = await User.countDocuments({})
    const nbCreches = await Creche.countDocuments({})
    const nbCommentaires = await Avis.countDocuments({})
    const nbEnfants = await Enfant.countDocuments({})
    const nbParents = await User.countDocuments({ role: 'parent' })
    const nbProprietaires = await User.countDocuments({ role: 'proprietaire' })
    // get the 5 creches with the highest noteEvaluation , tow creches with the same noteEvaluation will be sorted by name
    const Creches = await Creche.find({}).sort({ NoteEvaluationTotal: -1, nomCreche: 1 }).limit(7)

    let TopCreches = [];
    for (let i = 0; i < Creches.length; i++) {
        // add the name of the creche and noteEvauation to the TopCreches
        // first we convert noteEvaluation to int
        const noteEvaluation = parseInt(Creches[i].NoteEvaluationTotal)
        TopCreches.push({ name:stringify(Creches[i].nomCreche), noteEvaluation: noteEvaluation })
    }
    return res.json({ nbUsers, nbCreches, nbCommentaires, nbEnfants, nbParents, nbProprietaires, TopCreches })

}
)


module.exports = { getUsers, getAvis, deleteUser, deleteAvis, getCreches, deleteCreche, stats }