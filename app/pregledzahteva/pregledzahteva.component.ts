import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';
import { Zahtev } from '../models/Zahtev';

@Component({
  selector: 'app-pregledzahteva',
  templateUrl: './pregledzahteva.component.html',
  styleUrls: ['./pregledzahteva.component.css']
})
export class PregledzahtevaComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisniciService,private knjigaService:KnjigeService) { }

  ngOnInit(): void {
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.prijavljeniKor!=null){
      this.ulogovan=true;
      }

 this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((kor:Korisnik)=>{
  this.prijavljeniKor=kor;})
  this.dohvZahteve();
  }

  prijavljeniKor:Korisnik;
  ulogovan:boolean=false;
  zahtevi:any;
  logout(){
    localStorage.removeItem("ulogovan");
    this.router.navigate(['']);
      this.ulogovan=false;
      
    }
    dohvZahteve(){

     this.zahtevi=JSON.parse(localStorage.getItem("zahteviKnjige"));
      
      console.log(this.zahtevi);
    }
    odbijZahtev(z){
      for( let i=0;i<this.zahtevi.length;i++){
        if(this.zahtevi[i]==z){
          
            this.zahtevi.splice(i,1);
            console.log(this.zahtevi);
            console.log("OBRISAN ZAHTEV")
            localStorage.setItem("zahteviKnjige", JSON.stringify(this.zahtevi));
          
          this.dohvZahteve()}
              
            
          }
    }
    prihvatiZahtev(z){

      for( let i=0;i<this.zahtevi.length;i++){
        if(this.zahtevi[i]==z){
          this.knjigaService.dodajKnjigu(z.naziv,z.autor,z.zanr,z.izdavac,z.godina,z.jezik,z.slika).subscribe(()=>{
            console.log("DODATA KNJIGA")
            this.korisnikService.odobreniPredlozi(z.korime,z.naziv).subscribe((resObj)=>{
              if(resObj['message']=="ok"){
                console.log("dodat u odobrene predloge")
               
             }
            })
            this.zahtevi.splice(i,1);
            console.log(this.zahtevi);
            localStorage.setItem("zahteviKnjige", JSON.stringify(this.zahtevi));
          
          this.dohvZahteve()})
              }
            
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



