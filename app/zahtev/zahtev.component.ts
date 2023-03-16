import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';
import { Zahtev } from '../models/Zahtev';


class ImageSnipet{
  constructor(public src:string,public file:File){

  }
}
@Component({
  selector: 'app-zahtev',
  templateUrl: './zahtev.component.html',
  styleUrls: ['./zahtev.component.css']
})
export class ZahtevComponent implements OnInit {

  constructor(private korisnikService:KorisniciService,private router:Router) { }

  ngOnInit(): void {
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.prijavljeniKor!=null){
      this.ulogovan=true;
      }

 this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((kor:Korisnik)=>{
  this.prijavljeniKor=kor;})
  
  }
  ulogovan:boolean=false;
  prijavljeniKor:Korisnik;
  naziv:string;
  autor:string;
  zanr:string[];
  izdavac:string;
  godina:number;
  jezik:string;
  imagename:string="";
  selectedFile:ImageSnipet;
  selectedFile1:File;
  
  dodajSliku(event){
    this.selectedFile1=event.target.files[0];
    
    const img = document.querySelector('#photo');
    const file:File=event.target.files[0];
    const reader=new FileReader();
    reader.addEventListener('load',(event:any)=>{
      console.log("okkk")
  this.selectedFile=new ImageSnipet(event.target.result,file);
  img.setAttribute('src', reader.result.toString());
  console.log(reader.result.toString())
  this.imagename=this.selectedFile.file.name;
  
  console.log(this.imagename);
    });
    reader.readAsDataURL(file);
  }
  
  submit(){
    const formData=new FormData();
    formData.append('image',this.selectedFile1)
    
    this.korisnikService.upload(formData).subscribe(
      (res)=>console.log(res)
      
    );
  }
  
  
  
  
  
  
  
  
  logout(){
    localStorage.removeItem("ulogovan");
    this.router.navigate(['']);
      this.ulogovan=false;
      
    }
    posaljiZahtev(){
      this.submit();
      var autori = this.autor.split(', ')
     if(this.imagename==""){
      this.imagename="clip-art-book-16.jpg";
     }
     
     if(this.zanr.length>3){
  let poruka=document.getElementById("poruka");
  poruka.style.display="block";
     }
  else{
    

    let zahtev=new Zahtev(this.prijavljeniKor.korime,this.naziv,autori,this.zanr,this.izdavac,this.godina,this.jezik,this.imagename) 
    let zahtevi=JSON.parse(localStorage.getItem("zahteviKnjige"));
    if(zahtevi == null) zahtevi = [];
    zahtevi.push(zahtev)
localStorage.setItem("zahteviKnjige", JSON.stringify(zahtevi));
     console.log("POSLAT ZAHTEV")

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
