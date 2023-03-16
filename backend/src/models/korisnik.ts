import mongoose from "mongoose";

//formiramo semu
const Schema=mongoose.Schema;
let Korisnik =new Schema({
    korime:{type:String},
    lozinka:{type:String},
    ime:{type:String},
    prezime:{type:String},
    adresa:{type:String},
    telefon:{type:String},
    email:{type:String},
    slika:{type:String},
    tip:{type:String},
    zaduzenja:{type:Array},
    istorija:{type:Array},
    status:{type:String},
    odobreniPredlozi:{type:Array},
    odobrenaRezervacija:{type:Array}
}


)
export default mongoose.model('KorisnikModel',Korisnik,'korisnici');

