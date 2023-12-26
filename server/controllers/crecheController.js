const Creche = require('../models/creche');
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const User = require('../models/user');
const {stringify} = require("nodemon/lib/utils");
const enfantController = require("./enfantController");
const createCreche = asyncHandler(async (req, res) => {
    const {
        adrCreche,
        tel,
        email,
        wilaya,
        commune,
        url,
        typeEtablissement,
        typeAccueil,
        pedagogie,
        langeSupp,
        capacite,
        serviesUp,
        placesDispo,
        ageMin,
        ageMax,
        agenda,
        tarifs,
        Mixite,
        nomCreche,
        description,
        Images
    } = req.body;
    // test if the creche already exists
    const creche = await Creche.findOne({nomCreche, adrCreche});
    if (creche) {
        res.status(409).json({message: 'Creche already exists'});
    }
    // create the creche
    else {
        const id = req.user.id;
      
        //associate the creche with the user with that id
        const Proprietaire = await new mongoose.Types.ObjectId(id);
        
        // get the coordinates of the address from the google maps url and convert them to numbers
        const CordonneeX = Number(url.substring(url.indexOf('@') + 1, url.indexOf(',')));
        const CordonneeY = Number(url.substring(url.indexOf(',') + 1, url.indexOf(',') + 8));
        const location = {coordinates : [CordonneeX, CordonneeY]};
       
        const user = await User.findOne({_id: id});
        
        try {
            const newCreche = await Creche.create({
                nomProprietaire: user.nom + ' ' + user.prenom,
                adrCreche,
                tel,
                email,
                location,
                wilaya,
                commune,
                url,
                typeEtablissement,
                typeAccueil,
                pedagogie,
                langeSupp,
                capacite,
                serviesUp,
                placesDispo,
                ageMin,
                ageMax,
                agenda,
                tarifs,
                Mixite,
                nomCreche,
                description, 
                Images, //mzll
                Proprietaire: Proprietaire



            });
          
            // add the crech to the user's list of creches
            
            user.liste_creches.push(newCreche);
            await user.save();
            
            const liste_creches = await getCreatedCreches(req.user = user);
         
            const userImportansData = {
            
                liste_creches : liste_creches,
              

            }
            return res.status(200).json({creche : userImportansData});
        } catch (error) {
            return res.status(400).json({message: 'Invalid creche55', error:error.message});
        }
    }
});


const deleteCreche = asyncHandler(async (req, res) => {
    const creche = await Creche.findOne({_id: req.params.id});
    const id = stringify(req.user.id);
    const x = stringify(creche.Proprietaire);
    //compare x and id and make sure that they are the same type
    if (x !== id) {
        res.status(401);
        throw new Error('You are not authorized to delete this creche');
    }
    if (creche) {
        await creche.deleteOne();
        // delete the creche from the user's list of creches
        const user = await User.findById(req.user.id);
        //liste_creches is an array of object ids so we need to convert the id of the creche to an object id
        const crecheId =await new mongoose.Types.ObjectId(req.params.id);
        // remove the creche from the user's list of creches and save the user
        user.liste_creches.pull(crecheId);
        await user.save();
     
        const liste_creches = await getCreatedCreches(req.user = user);
       
        const userImportansData = {
         
            liste_creches : liste_creches,
         

        }
        return res.status(201).json({creche : userImportansData});
    } else {
        res.status(404);
        throw new Error('Creche not found');
    }
});

const updateCreche = asyncHandler(async (req, res) => {
    const creche = await Creche.findOne({_id: req.params.id});
    const id = stringify(req.user._id);
    const user = req.user;
    const x = stringify(creche.Proprietaire);
    //compare x and id and make sure that they are the same type
    if (x !== id) {
        res.status(401);
        throw new Error('You are not authorized to update this creche');
    }
    // we send the creche info as a response to the front end
    if (creche) {
        res.json(creche);
        const {
            adrCreche,
                tel,
                email,
                wilaya,
                commune,
                url,
                typeEtablissement,
                typeAccueil,
                pedagogie,
                langeSupp,
                capacite,
                serviesUp,
                placesDispo,
                ageMin,
                ageMax,
                agenda,
                tarifs,
                Mixite,
                nomCreche,
                description,
                Images
    } = req.body;
        // test if the creche already exists
        const newCreche = await Creche.findOne({nomCreche, adrCreche});
        if (newCreche) {
            return res.status(409).json({message: 'Creche already exists'});
        }
        // update the creche
        else {
            // get the coordinates of the address from the google maps url and convert them to numbers
            const CordonneeX = Number(url.substring(url.indexOf('@') + 1, url.indexOf(',')));
            const CordonneeY = Number(url.substring(url.indexOf(',') + 1, url.indexOf(',') + 8));
            const location = {coordinates : [CordonneeX, CordonneeY]};
            try {
                const updatedCreche = await Creche.updateOne(
                    {_id: req.params.id},
                    {
                        $set: {
                            nomProprietaire: user.nom + ' ' + user.prenom,
                            adrCreche,
                            tel,
                            email,
                            location,
                            wilaya,
                            commune,
                            url,
                            typeEtablissement,
                            typeAccueil,
                            pedagogie,
                            langeSupp,
                            capacite,
                            serviesUp,
                            placesDispo,
                            ageMin,
                            ageMax,
                            agenda,
                            tarifs,
                            Mixite,
                            nomCreche,
                            description,
                            Images
                         }
                    }
                );
                return res.status(201).json({message: 'Creche updated successfully', updatedCreche});
            } catch (error) {
                return res.status(400).json({message: 'Invalid creche', error});
            }
        }
    }
    else {
        return res.status(400).json({message : 'creche not found '})
    }
});
async function getCreatedCreches(user){
    //get all creches that are owned by the user as a table containing the creches
    //the user has a tablr that contains the ref of the creches that he owns
    //send the table to the front end
    return await Creche.find({_id: user.liste_creches});

}

async function getSavedCreches(user) {
    //get all creches that are saved by the user as a table containing the creches
    //the user has a tablr that contains the ref of the creches that he saved
    //send the table to the front end
    return await Creche.find({_id: user.crechesauvgardes})
}


module.exports = {
    createCreche,
    deleteCreche,
    updateCreche,
    getCreatedCreches,
    getSavedCreches
}
