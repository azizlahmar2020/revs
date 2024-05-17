const mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Partie = new Schema ({
nom:String,
joueur_1:String,
joueur_2:String,
etat:String
})
module.exports=mongoose.model("Partie",Partie);