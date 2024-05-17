const express = require("express")
const router = express.Router();
const Partie = require ("../models/partie")

router.post ("/Partie/:_id1/:_id2",async (req,res,next)=>{
 
 try{   const partie = new Partie ({
        nom: req.body.nom,
        joueur_1: req.params._id1,
        joueur_2: req.params._id2,
        etat:"en cours"
        
    })
    await partie.save()
    res.json ("partie added !!")

    }catch(err){console.log(err)}

})


module.exports=router;