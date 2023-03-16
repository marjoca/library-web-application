import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private router:Router,private knjigeService:KnjigeService,private korisnikService:KorisniciService) { }

  ngOnInit(): void {
   
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.prijavljeniKor!=null){this.ulogovan=true;
      this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((k:Korisnik)=>{
        this.prijavljeniKor=k;
        if(this.prijavljeniKor.status=="blokiran"){
          let napredna=document.getElementById("naprednapretraga");
          let promenalozinke=document.getElementById("promenalozinke");
          let zahtev=document.getElementById("zahtev");
          napredna.style.display="none";
          promenalozinke.style.display="none";
          zahtev.style.display="none";
        }
      })
    }
  }
prijavljeniKor:Korisnik;
ulogovan:boolean=false;
parametar:string="";
knjige: Knjiga[]=[];
nemaknjiga:boolean;
zanrovi:Array<String>=[];
od:number;
do:number;
izdavac:string="";
logout(){
  localStorage.removeItem("ulogovan");
  this.router.navigate(['']);
    this.ulogovan=false;
    
  }

  pretrazi(){
    let message=document.getElementById("nemaknjiga");
this.knjigeService.pretraziKnjige(this.parametar,this.zanrovi,this.od,this.do,this.izdavac).subscribe((knjige:Knjiga[])=>{
  this.knjige=knjige;
  if(knjige.length!=0){
    this.nemaknjiga=true;
    message.style.display="none";
  }
  else{
    
    this.nemaknjiga=false;
   
message.style.display="block"
    console.log("kkkkkkk")
  }
  console.log(this.knjige)
})
  }

  detaljioknjizi(k){
    if(this.ulogovan==false || this.prijavljeniKor.status=="blokiran"){

    }
    else{
    localStorage.setItem("knjiga", JSON.stringify(k));
    this.router.navigate(['detaljioknjizi']);
    }
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
