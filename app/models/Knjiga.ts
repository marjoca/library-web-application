import { Komentar } from "./Komentar";
import { Rezervacija } from "./Rezervacija";

export class Knjiga{
    id:number;
    naziv:string;
    autor:Array<string>;
    zanr:Array<string>;
    izdavac:string;
    godina:number;
    jezik:string;
    slika:string;
    bruzimanja:number;
    ocene:Array<number>;
    kolicina:number;
    rok:number;
    datumzaduzivanja:string;
    datumvracanja:string;
    recenzije:Array<Komentar>;
    produzio:boolean;
    zaduzenaOdStrane:Array<Object>;
    rezervacije:Array<Rezervacija>;
    constructor(naziv:string,autor:Array<string>,zanr:Array<string>,izdavac:string,godina:number,jezik:string,slika:string,bruzimanja:number,ocene:Array<number>,kolicina:number,rok:number,datumzaduzivanja:string,datumvracanja:string){
       this.naziv=naziv;
       this.autor=autor;
       this.zanr=zanr;
       this.izdavac=izdavac;
       this.godina=godina;
       this.jezik=jezik;
       this.slika=slika;
this.bruzimanja=bruzimanja;
this.ocene=ocene;
this.kolicina=kolicina;
this.rok=rok;
this.datumzaduzivanja=datumzaduzivanja;
this.datumvracanja=datumvracanja;
    }
}