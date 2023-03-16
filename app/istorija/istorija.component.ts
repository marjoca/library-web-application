import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';

import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisniciService,private knjigaService:KnjigeService) { }

  ngOnInit(): void {
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.prijavljeniKor!=null){
      this.ulogovan=true;
      }
    
 this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((kor:Korisnik)=>{
  this.prijavljeniKor=kor;
 this.istorija=kor.istorija;
 const tableBody=document.getElementById('tableData');
 let dataHtml='';
 for(let k of this.prijavljeniKor.istorija){
 let datum1=k.datumzaduzivanja;
 let datum2=k.datumvracanja;
 let dan1=datum1.toString().substring(8,10);
 let mesec1=datum1.toString().substring(5,7);
 let godina1=datum1.toString().substring(0,4);
 let dan2=datum2.toString().substring(8,10);
 let mesec2=datum2.toString().substring(5,7);
 let godina2=datum2.toString().substring(0,4);
 
  dataHtml+=`<tr><td>${k.naziv}</td><td>${k.autor}</td><td>${dan1}.${mesec1}.${godina1}.</td><td>${dan2}.${mesec2}.${godina2}.</td><td><button  style="width:70px;cursor:pointer;" id="${k.id}">detalji</button></td></tr>`;
  
  if(kor.status=="blokiran"){
    console.log("BLOKIRAN")
    let promenalozinke=document.getElementById("promenalozinke");
    let zahtev=document.getElementById("zahtev");
   
    promenalozinke.style.display="none";
    zahtev.style.display="none";
    
  }
 }
tableBody.innerHTML=dataHtml;
for(let k of this.prijavljeniKor.istorija){
const button = document.getElementById(`${k.id}`);
console.log(button)
button?.addEventListener('click', this.detaljiOKnjizi1)
  
}
 
 
 

 })
  }

  detaljiOKnjizi1: (any) => void = (event:any):void => {
   let id = event.srcElement.id;
   console.log(id)
    this.detaljiOKnjizi(id);
  }

ulogovan:boolean;
prijavljeniKor:Korisnik;
istorija:Knjiga[];
knjiga:Knjiga;

ucitajTableData(){
  const tableBody=document.getElementById('tableData');
 let dataHtml='';
 for(let k of this.prijavljeniKor.istorija){
 let datum1=k.datumzaduzivanja;
 let datum2=k.datumvracanja;
 let dan1=datum1.toString().substring(8,10);
 let mesec1=datum1.toString().substring(5,7);
 let godina1=datum1.toString().substring(0,4);
 let dan2=datum2.toString().substring(8,10);
 let mesec2=datum2.toString().substring(5,7);
 let godina2=datum2.toString().substring(0,4);
 
  dataHtml+=`<tr><td>${k.naziv}</td><td>${k.autor}</td><td>${dan1}.${mesec1}.${godina1}.</td><td>${dan2}.${mesec2}.${godina2}.</td><td><button  style="width:70px;cursor:pointer;" id="${k.id}">detalji</button></td></tr>`;
 }
tableBody.innerHTML=dataHtml;
for(let k of this.prijavljeniKor.istorija){
const button = document.getElementById(`${k.id}`);

button?.addEventListener('click', this.detaljiOKnjizi1)
  
}
}
logout(){
  localStorage.removeItem("ulogovan");
  
  this.router.navigate(['']);
    this.ulogovan=false;
    
  }

  detaljiOKnjizi(id){
    
    this.knjigaService.dohvKnjigu(id).subscribe((knj:Knjiga)=>{
      this.knjiga=knj;
      console.log(this.knjiga)
      localStorage.setItem("knjiga", JSON.stringify(this.knjiga));
    console.log("kliknuto");
    this.router.navigate(['detaljioknjizi']);
    })
    
  }
  sortiraj:string;
  sortirajTabelu(){
if(this.sortiraj=="naziv"){
this.istorija.sort((a, b) => a.naziv < b.naziv ? -1 : a.naziv > b.naziv ? 1 : 0)
console.log(this.istorija)
this.ucitajTableData();
}
if(this.sortiraj=="autor"){
 // this.istorija.sort((a, b) => a.autor.toString().su < b.naziv ? -1 : a.naziv > b.naziv ? 1 : 0)
 //for(let i of this.istorija){
 // let s= i.autor.toString().substring(i.autor.toString().indexOf(' ')+1);
  this.istorija.sort((a, b) => a.autor.toString().substring(a.autor.toString().indexOf(' ')+1) < b.autor.toString().substring(b.autor.toString().indexOf(' ')+1) ? -1 : a.autor.toString().substring(a.autor.toString().indexOf(' ')+1) > b.autor.toString().substring(b.autor.toString().indexOf(' ')+1) ? 1 : 0)
 // console.log(s)
 //}
  console.log(this.istorija)
  this.ucitajTableData();
  }
  
  if(this.sortiraj=="datumz"){
    // this.istorija.sort((a, b) => a.autor.toString().su < b.naziv ? -1 : a.naziv > b.naziv ? 1 : 0)
    //for(let i of this.istorija){
    // let s= i.autor.toString().substring(i.autor.toString().indexOf(' ')+1);
     this.istorija.sort((a, b) => new Date(+a.datumzaduzivanja.toString().substring(0,4),+a.datumzaduzivanja.toString().substring(5,7)-1,+a.datumzaduzivanja.toString().substring(8,10)) < new Date(+b.datumzaduzivanja.toString().substring(0,4),+b.datumzaduzivanja.toString().substring(5,7)-1,+b.datumzaduzivanja.toString().substring(8,10)) ? 1 : new Date(+a.datumzaduzivanja.toString().substring(0,4),+a.datumzaduzivanja.toString().substring(5,7)-1,+a.datumzaduzivanja.toString().substring(8,10)) > new Date(+b.datumzaduzivanja.toString().substring(0,4),+b.datumzaduzivanja.toString().substring(5,7)-1,+b.datumzaduzivanja.toString().substring(8,10)) ? -1 : 0)
    // console.log(s)
    //}
     console.log(this.istorija)
     this.ucitajTableData();
     }
     if(this.sortiraj=="datumv"){
      // this.istorija.sort((a, b) => a.autor.toString().su < b.naziv ? -1 : a.naziv > b.naziv ? 1 : 0)
      //for(let i of this.istorija){
      // let s= i.autor.toString().substring(i.autor.toString().indexOf(' ')+1);
       this.istorija.sort((a, b) => new Date(+a.datumvracanja.toString().substring(0,4),+a.datumvracanja.toString().substring(5,7)-1,+a.datumvracanja.toString().substring(8,10)) < new Date(+b.datumvracanja.toString().substring(0,4),+b.datumvracanja.toString().substring(5,7)-1,+b.datumvracanja.toString().substring(8,10)) ? 1 : new Date(+a.datumvracanja.toString().substring(0,4),+a.datumvracanja.toString().substring(5,7)-1,+a.datumvracanja.toString().substring(8,10)) > new Date(+b.datumvracanja.toString().substring(0,4),+b.datumvracanja.toString().substring(5,7)-1,+b.datumvracanja.toString().substring(8,10)) ? -1 : 0)
      // console.log(s)
      //}
       console.log(this.istorija)
       this.ucitajTableData();
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
