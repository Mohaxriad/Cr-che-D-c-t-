const Avis = require('../models/Avis')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");



async function commenter(req,response){




    const user=req.user;
    const idUser = await new mongoose.Types.ObjectId(user.id)
if (req.body.idCreche){
    const idCreche = req.body.idCreche;

    const ConcernedCreche = await new mongoose.Types.ObjectId(idCreche)
    const existingAvis = await Avis.findOne({
        IdUser:idUser,
        IdCreche:idCreche,

    })


    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NameUser: user.username,
                commentaire: [req.body.comm] ,
                IdUser: idUser,
                IdCreche:ConcernedCreche,
            });

            await newAvis.save()
            response.json(newAvis)
        }else{
            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {$push:{
                        commentaire:req.body.comm
                    }})

            response.json("Comment inserted successfully")

        }}catch(error){
        console.log(error)
    }

}
else {

    const existingAvis = await Avis.findOne({
        IdUser:idUser,
        IdCreche:{ $exists: false },
    })

    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NameUser: user.username,
                commentaire: [req.body.comm] ,
                IdUser: idUser,
            });

            await newAvis.save()
            response.json(newAvis)
        }else{
            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {$push:{
                        commentaire:req.body.comm
                    }})

            response.json("Comment inserted successfully")

        }}catch(error){
        console.log(error)
    }

}
}

async function Evaluer(req,response){


    const idUser = req.user.id;
    const user = await new mongoose.Types.ObjectId(idUser)
    if (req.body.idCreche){
    const idCreche = req.body.idCreche;
    const ConcernedCreche = await new mongoose.Types.ObjectId(idCreche)
    const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:idCreche})


    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NoteEvaluation: req.body.NoteEvaluation,
                IdUser: user,
                IdCreche:ConcernedCreche,
                NameUser: req.user.username,

            });

            await newAvis.save()
            response.json("Note Evaluation inserted successfully")

        }else{
            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {
                    NoteEvaluation: req.body.NoteEvaluation,
                })
            response.json("Note Evaluation inserted successfully")

        }}catch(error){
        console.log(error)
    }
}
else{
        const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:{ $exists: false }})
        try{
            if(!existingAvis){
                const newAvis = new  Avis({
                    NoteEvaluation: req.body.NoteEvaluation,
                    IdUser: user,
                    NameUser: req.user.username,

                });

                await newAvis.save()
                response.json("Note Evaluation inserted successfully")

            }else{
                const UpdatedAvis = await Avis.updateOne(
                    {_id:existingAvis.id},
                    {
                        NoteEvaluation: req.body.NoteEvaluation,
                    })
                response.json("Note Evaluation inserted successfully")

            }}catch(error){
            console.log(error)
        }

    }
}


async function CommenterEtEvaluer(req,response){


    const idUser = req.user.id;

    const user = await new mongoose.Types.ObjectId(idUser);
    if(req.body.IdCreche){
    const idCreche = req.body.IdCreche;
    const ConcernedCreche = await new mongoose.Types.ObjectId(idCreche)

    const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:idCreche})

    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                commentaire: [req.body.comm] ,
                NoteEvaluation: req.body.NoteEvaluation,
                IdUser: user,
                IdCreche:ConcernedCreche,
                NameUser: req.user.username,
            });

            await newAvis.save()
            response.json(newAvis)

        }else{

            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {$push:{
                        commentaire:req.body.comm
                    },
                    NoteEvaluation: req.body.NoteEvaluation,
                })

            response.json("Note Evaluation and comment inserted successfully")

        }}catch(error){

        console.log(error)

    }
}
else{

        const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:{ $exists: false }})

        try{
            if(!existingAvis){
                const newAvis = new  Avis({
                    commentaire: [req.body.comm] ,
                    NoteEvaluation: req.body.NoteEvaluation,
                    IdUser: user,
                    NameUser: req.user.username,
                });

                await newAvis.save()
                response.json(newAvis)

            }else{

                const UpdatedAvis = await Avis.updateOne(
                    {_id:existingAvis.id},
                    {$push:{
                            commentaire:req.body.comm
                        },
                        NoteEvaluation: req.body.NoteEvaluation,
                    })

                response.json("Note Evaluation and comment inserted successfully")

            }}catch(error){

            console.log(error)

        }

    }
}


async function GiveAvis(req,response){

    try{
        if(req.body.comm && req.body.NoteEvaluation){
            CommenterEtEvaluer(req,response);
        }else{
            if(req.body.comm){
                commenter(req,response);
            }else{
                if(req.body.NoteEvaluation){
                    Evaluer(req,response);
                }else{
                    response.send("Invalid Avis, provide a comment or an evaluation")
                }
            }

        }

    }catch(err){
        response.status(400).send(err)
    }
}
async function getAvisCreche(req,res){
    const idCreche = req.params.id;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        const avis = await Avis.find({IdCreche:idCreche}).sort({DateCreation:-1}).limit(4);
        return res.json({avis})
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = decoded.user;
        const avisUser = await Avis.find({IdCreche:idCreche,IdUser:user.id}).sort({DateCreation:-1}).limit(4);
        const avisOtherUser = await Avis.find({IdCreche:idCreche,IdUser:{$ne:user.id}}).sort({DateCreation:-1}).limit(4);
        return res.json({avisUser,avisOtherUser})
    }
    catch (error) {
        const avis = await Avis.find({IdCreche:idCreche}).sort({DateCreation:-1}).limit(4);
        return res.json({avis})
    }
}
async function getAvis(req,res){
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        const avis = await Avis.find();
        return res.json({avis})
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = decoded.user;
        const avisUser = await Avis.find({IdCreche:{$exists:false},IdUser:user.id}).sort({DateCreation:-1}).limit(4);
        const avisOtherUser = await Avis.find({IdCreche:{$exists:false},IdUser:{$ne:user.id}}).sort({DateCreation:-1}).limit(4);
        return res.json({avisUser,avisOtherUser})
    }
    catch (error) {
        const avis = await Avis.find({IdCreche:{$exists:false}}).sort({DateCreation:-1}).limit(4);
        return res.json({avis})
    }

}

async function deelete(req, res) {
    try {
        const id = req.params.id;
        const result = await Avis.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}


















module.exports= {GiveAvis,getAvis,deelete,getAvisCreche}