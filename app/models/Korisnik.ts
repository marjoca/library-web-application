
import { Knjiga } from "./Knjiga";
import { Odobreno } from "./Odobreno";


export class Korisnik{
    korime: string;
    lozinka: string;
    ime: string;
    prezime: string;
    adresa:string;
    telefon:string;
    email:string;
    slika:string;
    zaduzenja:Array<Knjiga>;
  istorija:Array<Knjiga>;
  tip:string;
 status:string;
 odobreniPredlozi:Array<String>;
 odobrenaRezervacija:Array<Odobreno>;
  //da li treba inicijalizovati ova polja u konstruktoru???

    constructor(username:string,password:string,name:string,surname:string,address:string,telephone:string,email:string,imagename:string){
this.korime=username;
this.lozinka=password;
this.ime=name;
this.prezime=surname;
this.adresa=address;
this.telefon=telephone;
this.email=email;
this.slika=imagename;
    }
}