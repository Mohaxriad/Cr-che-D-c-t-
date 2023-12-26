const RendezVous = require('../models/RendezVous');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Creche = require('../models/creche')
const sendEmail = require('../config/sendEmail')

const mongoose = require("mongoose");
const createRendezVous = asyncHandler(async (req, response) => {


  // Get the reservation data from the request body
  const {
    date,
    heure,
    Creche,
    proprietaire
  } = req.body;

  const parent = req.user.id;

  // Check if the reservation data is valid
  if (!date || !heure || !Creche || !parent || !proprietaire) {
    response.status(400).json({message: "Invalid rdv data."})
    return;
  }

  if(! await PlanificationPossible(heure,date)){
    console.log("Impossible timing")
    response.json("Impossible Timing")
    return
  }



  // Create a new renderVous
  const rendezVous = new RendezVous({
    date:new  Date(date),
    heure:heure,
    Proprietaire: new  mongoose.Types.ObjectId(proprietaire),
    creche: new  mongoose.Types.ObjectId(Creche),
    parent : new mongoose.Types.ObjectId(parent)
  });

  // Save the reservation
  await rendezVous.save();

  const proprio = await User.findById(proprietaire);
  const Parent = await User.findById(parent);
  const options ={
    to:proprio.email,
    subject: 'Nouvelle RendezVous',
    text:`Cher Proprietaire, Une nouvelle demande de rendez Vous a ete effectuee par ${Parent.nom} ${Parent.prenom},
    Veillez consulter la liste de vos Rendez-Vous`
  }

  sendEmail(options)

  // Send a success response
  response.status(201).json({message: "rendezVous created successfully."})
});



    // Confirm a reservation
 async   function confirmerRendezVous(req,response) {
      const id = req.params.id;
      req.user = {id: req.body.idUser};

      try{
        const rendezvous = await RendezVous.findById(id);

        if(!rendezvous.Proprietaire.equals(req.user.id)){
            console.log("You don't have permission to confirm this Meeting")
            response.json("You don't have permission to confirm this Meeting")
            return 
        }
            rendezvous.isConfirmed = true
            rendezvous.isRefused = false
            rendezvous.save()
            .then(()=>{
                console.log("Rendez Vous Confirmed Succesfully")
                response.json("Rendez Vous Confirmed Succesfully")
            })

            const creche = await Creche.findById(rendezvous.creche)


            const options ={
              to: rendezvous.parent.email,
              subject: 'RendezVous Confirmed',
              text:`Cher Parent, Votre demande de rendez-Vous avec le proprietaire du creche ${creche.nomCreche} Mr. ${creche.nomProprietaire} est confirmee`
            }
            
            sendEmail(options)

      }catch(err){

        console.log(err);
        response.json(err)

      }
    }
    
  
  // Cancel a reservation
 async function annulerRendezVous(req,response) {
    const id = req.params.id;
    req.user = {id: req.body.idUser};

          try{
            const rendezvous = await RendezVous.findById(id);

            if(!rendezvous.Proprietaire.equals(req.user.id)){
                console.log("You don't have permission to cancel this Meeting")
                response.json("You don't have permission to Cancel this Meeting")
                return 
            }
                rendezvous.isRefused = true
                rendezvous.isConfirmed = false
                rendezvous.save()
            .then(()=>{

                response.json("RendezVous Refused Succesfully")
                console.log("RendezVous Refused Succesfully")
            })
            const creche = await Creche.findById(rendezvous.creche)

            const options ={
              to: rendezvous.parent.email,
              subject: 'RendezVous Refused',
              text:`Cher Parent, Votre demande de rendez-Vous avec le proprietaire du creche ${creche.nomCreche} Mr. ${creche.nomProprietaire} est refusee`
            }
            
            sendEmail(options)

      }catch(err){

        console.log(err);
        response.json(err)
        
      };
  }
  


 
  
 


  // verify available time for rdv

  async function PlanificationPossible(heure,date) {
    const  startTime = heure;
  
    // Convert string time values to Date objects
    const startDateTime = new Date(`2000-01-01T${startTime}`);
    console.log(typeof formatTime(new Date(startDateTime.getTime() - 30 * 60000)))
    
  
    // Check if there is any event starting before with less than half an hour
    const startBeforeEvent = await RendezVous.findOne({
      heure: { $gt: formatTime(new Date(startDateTime.getTime() - 30 * 60000)),
        $lte: heure } ,
        date: new Date(date) // Subtracting 30 minutes from start time
    });
    console.log(startBeforeEvent)
    console.log(formatTime(new Date(startDateTime.getTime() - 30 * 60000)))

  
    if (startBeforeEvent) {
      return false; // Conflict found
    }

    // Check if there is any event starting after with less than half an hour
    const startAfterEvent = await RendezVous.findOne({
      heure: { $lt: formatTime(new Date(startDateTime.getTime() + 30 * 60000)),
                $gte:heure },
       date:new Date(date)         
     // Adding 30 minutes to end time
    });


    console.log(startAfterEvent)
    console.log(formatTime(new Date(startDateTime.getTime() + 30 * 60000)))


  
    if (startAfterEvent) {
      return false; // Conflict found
    }
  
    return true; // No conflicts found
  }
  
  // Helper function to format Date object to time string
  function formatTime(date) {
    return date.toTimeString().slice(0, 5);
  }

  async function getProprioRdvs(req,res){
    
    RendezVous.aggregate([
      {
        $match: {
          "Proprietaire": await new mongoose.Types.ObjectId(req.user.id)
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
        $unwind: "$creche"
      },
      {
        $unwind: "$parent"
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
  
  
  async function getParentRdvs(req,res){
    
    RendezVous.aggregate([
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
        $unwind: "$creche"
      },
      {
        $unwind: "$parent"
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
    createRendezVous,
    confirmerRendezVous,
    annulerRendezVous,
    getParentRdvs,
    getProprioRdvs
  };