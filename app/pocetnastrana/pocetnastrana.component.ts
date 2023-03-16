import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';

@Component({
  selector: 'app-pocetnastrana',
  templateUrl: './pocetnastrana.component.html',
  styleUrls: ['./pocetnastrana.component.css']
})
export class PocetnastranaComponent implements OnInit {

  constructor(private router:Router,private knjigeService:KnjigeService,private korisnikService:KorisniciService) { }

  ngOnInit(): void {
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));

    if(this.prijavljeniKor!=null){
      this.ulogovan=true;
      this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((k:Korisnik)=>{
        this.prijavljeniKor=k;
        console.log("DOHVACEN KORISNIK")
        this.odrediKnjiguDana();
        if(this.prijavljeniKor.status=="blokiran"){
         
          let promenalozinke=document.getElementById("promenalozinke");
          let zahtev=document.getElementById("zahtev");
         
          promenalozinke.style.display="none";
          zahtev.style.display="none";
        }
      })
      
    }
    else{
      
      if(this.ulogovan==false){
        this.knjigeService.dohvSveKnjige().subscribe((k:Knjiga[])=>{
          this.sveKnjige=k;
          this.sveKnjige.sort((a, b) => b.bruzimanja - a.bruzimanja);
          
          this.slideIndex=1;
          
            this.showDivs(this.slideIndex)
          
          
        })
        
      }
    }
  
    
   
   
    
  }
top3Knjige:Knjiga[]=[];
prijavljeniKor:Korisnik;
ulogovan:boolean=false;
sveKnjige:Knjiga[]=[];
knjigaDana:Knjiga;
prosecnaOcena:Number;

odrediKnjiguDana(){
  this.knjigeService.dohvSveKnjige().subscribe((k:Knjiga[])=>{
    this.sveKnjige=k;
    const datum=new Date();
    console.log(datum)
    this.knjigaDana=this.sveKnjige[(datum.getFullYear()*datum.getDate()*(datum.getMonth()+1))%this.sveKnjige.length];
   //this.knjigaDana=this.sveKnjige[Math. floor(Math. random() * this.sveKnjige. length)];
  console.log(this.knjigaDana);
  this.odrediProsecnuOcenu();//ovo da napisem
  
  })
}

logout(){
localStorage.removeItem("ulogovan");
this.router.navigate(['']);
  this.ulogovan=false;
  this.slideIndex=1;
          
            this.showDivs(this.slideIndex)
}


slideIndex:number;
plusDivs(n) {
  this.showDivs(this.slideIndex += n);
}

showDivs(n) {
  var i;
  var x;
  x = document.getElementsByClassName("top3knjige");
  if (n > x.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[this.slideIndex-1].style.display = "block";
}
odrediProsecnuOcenu(){
var suma=0;
for(let recenzija of this.knjigaDana.recenzije){
  suma+=recenzija.ocena;
}

this.prosecnaOcena=suma/this.knjigaDana.recenzije.length;
}

daLiIsticeRok():boolean{
  for(let z of this.prijavljeniKor.zaduzenja){
    if(z.rok<=2 && z.rok>0){
      return true;
    }
  }
  return false;
}
daLiJeIstekaoRok():boolean{
  for(let z of this.prijavljeniKor.zaduzenja){
    if(z.rok<=0){
      return true;
    }
  }
  return false;
}
daLiImaMaxZaduzenih():boolean{
  if(this.prijavljeniKor.zaduzenja.length==3)return true;
  else return false;
}
daLiJeBlokiran():boolean{
  if(this.prijavljeniKor.status=="blokiran")return true;
  else return false;
}
daLiImaOdobrenihPredloga():boolean{
  if(this.prijavljeniKor.odobreniPredlozi.length!=0){
    return true;
  }
  else return false;
}
daLiImaOdobrenihRezervacija():boolean{
  if(this.prijavljeniKor.odobrenaRezervacija.length!=0){
    return true;
  }
  else return false;
}
kliknuto:boolean=false;
prikaziMeni(){
  let meni=document.getElementById("meni");
  meni.style.display="block";
  if(this.kliknuto==false) this.kliknuto=true;
  else{this.kliknuto=false;
  meni.style.display="none"}
}
}
