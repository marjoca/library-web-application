

export class Zahtev{
    korime:string;
    id:number;
    naziv:string;
    autor:Array<string>;
    zanr:Array<string>;
    izdavac:string;
    godina:number;
    jezik:string;
    slika:string;
   
    constructor(korime:string,naziv:string,autor:Array<string>,zanr:Array<string>,izdavac:string,godina:number,jezik:string,slika:string){
        this.korime=korime;
       this.naziv=naziv;
       this.autor=autor;
       this.zanr=zanr;
       this.izdavac=izdavac;
       this.godina=godina;
       this.jezik=jezik;
       this.slika=slika;

    }
}