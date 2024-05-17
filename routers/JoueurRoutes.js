const express = require("express")
const router = express.Router();
const Joueur = require ("../models/joueur.js");



router.get("/getAllJoueur",async (req,res,next)=>{
    const joueur=await Joueur.find()
    res.json(joueur)
});

router.post ('/add', async (req,res,next)=>{
    const joueur = new Joueur ({
        pseudo:req.body.pseudo,
        sante:100,
        score:0
    })
    await joueur.save();
    res.json("joueur added !!")
});
router.delete("/delete/:_id",async(req,res,next)=>{
    try {
            const joueur= await Joueur.findByIdAndDelete(req.params._id);
            res.json("joueur deleted !!")
    } catch(err){
        console.log(err);
    
    }
})
router.put("/attaque/:_id1/:_id2", async (req, res, next) => {
    try {
        const joueurVec = await Joueur.findById(req.params._id1);
        const joueurGagn = await Joueur.findById(req.params._id2);

        joueurVec.sante -= 10;
        joueurGagn.score += 10;

        await joueurVec.save();
        await joueurGagn.save();

        res.status(200).json({ message: "Attaque réussie !" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de l'attaque." });
    }
});

router.get("/getById/:_id",async(req,res,next)=>{
  
  try{  const joueur= await Joueur.findById(req.params._id);
    res.json(joueur)
    if (!joueur) {
        res.status(500).json({ message: 'Student not found' });
      } else {
        res.json(joueur);
      }
    } catch (error) {
      next(error);
    }
}



)


module.exports=router;