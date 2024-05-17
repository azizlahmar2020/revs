const mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Joueur = new Schema ({
pseudo:String,
sante:Number,
score:Number,
})
module.exports=mongoose.model("Joueur",Joueur);