const Enfant = require('../models/enfant');
const Creche = require('../models/creche');
const User = require('../models/user');
const asynchandler = require('express-async-handler');
const mongoose = require("mongoose");
const {stringify} = require("nodemon/lib/utils");
const crecheController = require("./crecheController");

const creeEnfant = asynchandler(async (req, res) => {  
    
   const { nom, age ,prenom , sexe  } = req.body;
   const id = req.user.id;
   try {
       const enfant = await Enfant.create({
           nom,
           age,
           Parent: id,
           prenom,
           sexe,
       });
       let user = await User.findById(id);
         user.Enfant.push(enfant);
         user.save();
     
       const EEEenfant = await getEnfant(req.user = user);
       
       const userImportansData = {
           Enfant : EEEenfant,
       }
   
       res.status(200).json({  enfant : userImportansData });
    } catch (error) {
       
        res.status(400).json({ message: error.message});
    }
});
const supprimeEnfant = asynchandler(async (req, res) => {
    const { id } = req.params;
    const idUser = req.user.id;
    try{
    const enfant = await Enfant.findById(id);
    if (stringify(enfant.Parent)=== stringify( idUser)) {
        await Enfant.findByIdAndDelete(id);
        const user = await User.findById(idUser);
        const enfantID = new mongoose.Types.ObjectId(id);
        user.Enfant.pull(enfantID);
        user.save();
        const EEEenfant = await getEnfant(req.user = user);
       
        const userImportansData = {
            Enfant : EEEenfant,
        }
        res.status(200).json({  enfant : userImportansData });
    } else {
        res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet enfant' });
    }}
    catch (error) {
        res.status(400).json({ message: 'enfant exist pas' });
    }
}
);
async function  getEnfant  (user) {
    try{
        return await Enfant.find({Parent: user._id});
    }
    catch (error) {
        //res.status(400).json({ message: 'enfant exist pas' });
    }
}
const ajouteCreche = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { idCreche } = req.body;
    const idUser = req.user.id;
    const enfant = await Enfant.findById(id);
    if (stringify( enfant.Parent )=== stringify( idUser)) {
        const creche = await Creche.findById(idCreche);
        enfant.Creche.push(await new mongoose.Types.ObjectId(idCreche));
        enfant.save();
        creche.PlacesDisponibles -= 1;
        creche.save();
        res.status(200).json({ message: 'Crèche ajoutée à l\'enfant' });
    } else {
        res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet enfant' });
    }
});
const modifieEnfant = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { nom, age , sexe , prenom } = req.body;
    const idUser = req.user.id;
    try{
        const enfant = await Enfant.findById(id);
        if (stringify( enfant.Parent )=== stringify( idUser)){
            enfant.nom = nom;
            enfant.age = age;
            enfant.sexe = sexe;
            enfant.prenom = prenom;
            enfant.save();
            const user = await User.findOne({_id : idUser});
            const Enfant = await getEnfant(req.user = user);
         
            const userImportansData = {
              
                Enfant : Enfant,
               

            }
            res.status(200).json({  enfant : userImportansData });
        } else {
        res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet enfant' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'enfant exist pas' });
    }
});

module.exports = {
    creeEnfant,
    supprimeEnfant,
    getEnfant,
    ajouteCreche,
    modifieEnfant
}