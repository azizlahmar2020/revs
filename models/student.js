const mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Student = new Schema ({
classeEtudiant:String,
nom:String,
note:Number,
})
module.exports=mongoose.model("student",Student);