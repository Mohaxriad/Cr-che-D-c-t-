const { exists } = require("../models/creche");

async function ParseQueryString( req,response,next) {
    const filters ={}
    let geoFilter={}
    const queryParams =req.query;
    const agenda = 'agenda.'
  
 try{ 
    // queries For the entered Text in the Search bar
  
    if(queryParams.SearchBarInput){

        Object.assign(filters,{$or:[
        {nomCreche : new RegExp(queryParams.SearchBarInput, 'i')},
        {adrCreche : new RegExp(queryParams.SearchBarInput, 'i')},
        {wilaya : new RegExp(queryParams.SearchBarInput, 'i')},
        {commune : new RegExp(queryParams.SearchBarInput, 'i')}
        
    ]}
        )

      }
    
    
    // queries For Filter Selections
    if(queryParams.commune && queryParams.commune != 'Aucun'){
      filters.commune = queryParams.commune;
    }
  
    if(queryParams.wilaya && queryParams.wilaya !='Aucun'){
      filters.wilaya = queryParams.wilaya;
    }
  
    if(queryParams.TypeAccueil && queryParams.TypeAccueil !='Aucun'){
      filters.typeAccueil = queryParams.TypeAccueil;
    }
  
    if(queryParams.TypeEtablissement && queryParams.TypeEtablissement !='Aucun'){
      filters.typeEtablissement = queryParams.TypeEtablissement;
    }
  
    if(queryParams.capacite && queryParams.capacite !='Aucun'){
      filters.capacite = {$lte: parseInt(queryParams.capacite)};
    }
  
    if(queryParams.Age &&  queryParams.Age != 'Aucun' ){
      filters.ageMin = {$lte: parseInt(queryParams.Age)}
      filters.ageMax = {$gte: parseInt(queryParams.Age)}
  
    }
  
    if(queryParams.Pedagogie && queryParams.Pedagogie !='Aucun'){
      filters.pedagogie = queryParams.Pedagogie;
    }
  
    if(queryParams.JourAccueil){
        queryParams.JourAccueil.split(',').forEach(element => {
            Object.assign(filters,{[agenda.concat(element)] :{$exists:true}})
        });
    }
  
    if(queryParams.PlacesDisponibles && queryParams.PlacesDisponibles != 'Aucun' ){
        if(queryParams.PlacesDisponibles === 'Places disponibles'){
            filters.placesDispo = {$gt: 0};
        }else{
            filters.placesDispo = 0;

        }
    }

    if(queryParams.tarif && queryParams.tarif !='Aucun'){
      filters.tarifs = {$gte: parseInt(queryParams.tarif),
                        $lte: parseInt(queryParams.tarif)+2000};


    }


  
  
  
    if(queryParams.Services){
      filters.serviesUp = {$all: queryParams.Services.split(',')}
    }
  
    if(queryParams.Mixite && queryParams.Mixite !='Aucun' ){
      filters.Mixite = queryParams.Mixite;
    }
  
    if(queryParams.Langue && queryParams.Langue !='Aucun'){
      filters.langeSupp = queryParams.Langue;
    }
  
    if(queryParams.NoteEvaluationTotal && queryParams.NoteEvaluationTotal !='Aucun' ){
      filters.NoteEvaluationTotal = {$gte: parseInt(queryParams.NoteEvaluationTotal)};
    }
  
  // Test if the filter Object is Empty

  
  
    // queries for geoLocation 
    if(queryParams.longitude && queryParams.latitude){
      const coords = [+queryParams.longitude,+queryParams.latitude]
      if(queryParams.Distance){
          geoFilter ={
              location: {
                  $near: {
                    $geometry: {
                      type: 'Point',
                      coordinates: coords,
                    },
                    $maxDistance: parseInt(queryParams.Distance),
                  },
                }
              } 
      }else{
          geoFilter ={
              location: {
                  $near: {
                    $geometry: {
                      type: 'Point',
                      coordinates: coords,
                    },
                    $maxDistance: 1000,
                  },
                }
              } 
      }
      Object.assign(filters,geoFilter);
    }

    if(!(Object.keys(filters).length === 0)){
      req.filters = filters;
    }
        next()

   }catch(err){
        console.error(err);
        response.status(400).send('Request Parsing problem');
   }
  

  
  
  }
  
  
  
  
  
  module.exports={ParseQueryString}