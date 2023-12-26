const Reservation = require('../models/reservation');
const creche = require('../models/creche');
const Enfant = require('../models/enfant');
const User = require('../models/user');
const sendEmail = require('../config/sendEmail')
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");

const createReservation = asyncHandler(async (req, res) => {

try{
  // Get the reservation data from the request body
  const {
    dateDebut,
    dateFin,
    Creche,
    enfant,
    proprietaire
  } = req.body;
 const  parent = req.user.id;
 console.log({
  dateDebut,
  dateFin,
  Creche,
  enfant,
  proprietaire
})

  // Check if the reservation data is valid
  if (!dateDebut || !dateFin || !Creche || !parent ) {
    res.status(400).json({message: "Invalid reservation data."})
    return;
  }
  const enfantResult = await Enfant.findById(enfant)

  if(!enfantResult.Parent.equals(parent)){
    console.log("You don't have permission to reserve a place for this child")
    res.json("You don't have permission to reserve a place for  this child")
    return
  }

  // Check if the creche has enough places available
  const crecheModel = await creche.findOne({_id:Creche});
  if (crecheModel.PlacesDisponibles<= 0) {
    res.status(400).json({message: "No more places available."})
    return;
  }

  



  // Create a new reservation
  const reservation = new Reservation({
    dateDebut:  new  Date(dateDebut),
    dateFin:new Date(dateFin),
    creche:  new  mongoose.Types.ObjectId(Creche),
    parent : new mongoose.Types.ObjectId(parent),
    proprietaire : new mongoose.Types.ObjectId(proprietaire),
    enfant : new mongoose.Types.ObjectId(enfant)

  });

  const proprio = await User.findById(proprietaire);
  const Parent = await User.findById(parent);
  const options ={
    to:proprio.email,
    subject: 'Nouvelle Reservation',
    text:`Cher Proprietaire, Une nouvelle reservation a ete effectuee par ${Parent.nom} ${Parent.prenom},
    Veillez consulter la liste des reservations`
  }

  sendEmail(options)



  // Save the reservation
  await reservation.save();

  // Send a success response
  res.status(201).json({message: "Reservation created successfully."})
}catch(err){
    console.log(err)
    res.json(err)

}});




    

// Confirm a reservation


async function confirmerReservation(req,response) {
      const id = req.params.id;
      req.user = {id: req.body.idUser};

      try{

        const reservation = await Reservation.findById(id);

        if(!reservation.proprietaire.equals(req.user.id)){
            console.log("You don't have permission to confirm this reservation")
            response.json("You don't have permission to confirm this reservation")
            return 
        }
            reservation.isConfimed = true
            reservation.isCancelled = false
            reservation.save()
            .then(()=>{
                console.log("Reservation Confirmed Succesfully")
                response.json("Reservation Confirmed Succesfully")
            })

            const options ={
              to: reservation.parent.email,
              subject: 'Reservation Confirmed',
              text:''
            }
            
          //  sendEmail(options)

      }catch(err){

        console.log(err);
        response.json(err)

      }
    }
    
  
  // Cancel a reservation
async function annulerReservation(req,response) {
    const id = req.params.id;
    req.user = {id: req.body.idUser};

          try{

            const reservation = await Reservation.findById(id);

            if(!reservation.proprietaire.equals(req.user.id)){
                console.log("You don't have permission to cancel this reservation")
                response.json("You don't have permission to cancel this reservation")
                return 
            }
                reservation.isCancelled = true
                reservation.isConfimed = false
                reservation.save()
            .then(()=>{

                response.json("Reservation Cancelled Succesfully")
                console.log("Reservation Cancelled Succesfully")
            })

            const options ={
              to: reservation.parent.email,
              subject: 'Reservation Cancelled',
              text:''
            }
            
          //  sendEmail(options)

      }catch(err){

        console.log(err);
        response.json(err)
        
      };
  }


async function getProprioReservations(req,res){
    Reservation.aggregate([
      {
        $match: {
          "proprietaire": await new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $lookup: {
          from: "creches",
          localField: "creche",
          foreignField: "_id",
          as: "creche"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "parent",
          foreignField: "_id",
          as: "parent"
        }
      },
      {
        $lookup: {
          from: "enfants",
          localField: "enfant",
          foreignField: "_id",
          as: "enfant"
        }
      },
      {
        $unwind: "$creche"
      },
      {
        $unwind: "$parent"
      },{
        $unwind: "$enfant"
      },
      {
        $project: {
          "creche._id": 0,
          "creche.proprietaire": 0,
          "parent._id": 0
        }
      }
    ]).then(result => {
     
    console.log(result)
    res.json(result)
      
      // Access the result here
    });
  }
  
  
  async function getParentReservations(req,res){
    console.log(req.user.id)
    Reservation.aggregate([
      {
        $match: {
          "parent": await new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $lookup: {
          from: "creches",
          localField: "creche",
          foreignField: "_id",
          as: "creche"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "parent",
          foreignField: "_id",
          as: "parent"
        }
      },
      {
        $lookup: {
          from: "enfants",
          localField: "enfant",
          foreignField: "_id",
          as: "enfant"
        }
      },
      
      {
        $unwind: "$creche"
      },
      {
        $unwind: "$parent"
      },
      {
        $unwind: "$enfant"
      },
      {
        $group: {
          _id: "$creche.nomCreche",
          crecheId: { $first: "$creche._id" },
          crecheName: { $first: "$creche.nomCreche" },
          reservations: { $push: "$$ROOT" },
        }
      },
      {
        $project: {
          _id: 0,
          crecheId: 1,
          crecheName: 1,
          reservations: 1,
        }
      }
    ]).then(result => {
      console.log(result)
      res.json(result)
  


      
      // Access the result here
    });
  }

 
  

  
  
  module.exports = {
    createReservation,
    confirmerReservation,
    annulerReservation,
    getProprioReservations,
    getParentReservations
  };