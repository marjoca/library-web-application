import mongoose from "mongoose";

const Schema=mongoose.Schema;
let Knjiga=new Schema({
id:{type:Number},
naziv:{type:String},
autor:{type:Array},
zanr:{type:Array},
izdavac:{type:String},
godina:{type:Number},
jezik:{type:String},
slika:{type:String},
bruzimanja:{type:Number},
ocene:{type:Array},
kolicina:{type:Number},
rok:{type:Number},
datumzaduzivanja:{type:Date},
datumvracanja:{type:Date},
recenzije:{type:Array},
zaduzenaOdStrane:{type:Array},
rezervacije:{type:Array}
})


export default mongoose.model('KnjigaModel',Knjiga,'knjige');