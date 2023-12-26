const Creche = require('../models/creche')


// Search with filters function
async function findCrecheByFilters( req,response) {
    
    let filters ={};
    filters = req.filters // filter

    
    try{
         Creche.find(filters).sort({NoteEvaluationTotal:-1}).limit(20)
        .then(data=>{
            response.json(data);
        })
        
        }catch(err){
            console.error(err);
            response.status(500).send('Server Error');
      }
      


}


async function getRandomCreches(req,response) {
    
    let filters ={};

    
    try{
         Creche.find(filters)
        .then(data=>{
            response.json(data);
        })
        
        }catch(err){
            console.error(err);
            response.status(500).send('Server Error');
      }
      


}





module.exports={findCrecheByFilters,getRandomCreches}