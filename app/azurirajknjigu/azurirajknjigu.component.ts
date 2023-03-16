import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';

class ImageSnipet{
  constructor(public src:string,public file:File){

  }
}
@Component({
  selector: 'app-azurirajknjigu',
  templateUrl: './azurirajknjigu.component.html',
  styleUrls: ['./azurirajknjigu.component.css']
})
export class AzurirajknjiguComponent implements OnInit {

  constructor(private knjigaService:KnjigeService,private korisnikService:KorisniciService,private router:Router) { }

  ngOnInit(): void {
    this.knjiga = JSON.parse(localStorage.getItem("knjiga"));
    console.log(this.knjiga)
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));
    this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((k:Korisnik)=>{
      this.prijavljeniKor=k;
    })
  }
  prijavljeniKor:Korisnik;
knjiga:Knjiga;
novNaziv:string;
  novAutor:string;
  novZanr:string[]=[];
  novIzdavac:string;
  novaGodina:number;
  novJezik:string;
  imagename:string="";
  novaKolicina:number;
  promeninaziv(){
this.knjigaService.promeniPolje(this.knjiga.id,'naziv',this.novNaziv).subscribe((resObj)=>{
  if (resObj['message'] == "ok") {
    console.log("azuriran korisnik!")
    /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
      this.knjiga=k;})*/
  }
})
  }
  promeniautora(){
    var autori = this.novAutor.split(', ')
    this.knjigaService.promeniPolje(this.knjiga.id,'autor',autori).subscribe((resObj)=>{
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenizanr(){
    let poruka=document.getElementById("poruka");
    poruka.style.display="none";
    if(this.novZanr.length>3){
      let poruka=document.getElementById("poruka");
      poruka.style.display="block";
         }
         else{
          this.knjigaService.promeniPolje(this.knjiga.id,'zanr',this.novZanr).subscribe((resObj)=>{
            if (resObj['message'] == "ok") {
              console.log("azuriran korisnik!")
              /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
                this.knjiga=k;})*/
            }
          })
         }
  }
  promeniizdavaca(){
    this.knjigaService.promeniPolje(this.knjiga.id,'izdavac',this.novIzdavac).subscribe((resObj)=>{
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenigodinu(){
    this.knjigaService.promeniPolje(this.knjiga.id,'godina',this.novaGodina).subscribe((resObj)=>{
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenijezik(){
    this.knjigaService.promeniPolje(this.knjiga.id,'jezik',this.novJezik).subscribe((resObj)=>{
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenisliku(){
    if(this.imagename==""){
      this.imagename="clip-art-book-16.jpg";
     }
     this.knjigaService.promeniPolje(this.knjiga.id,'slika',this.imagename).subscribe((resObj)=>{
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenikolicinu(){
    this.knjigaService.promeniPolje(this.knjiga.id,'kolicina',this.novaKolicina).subscribe((resObj)=>{
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
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
