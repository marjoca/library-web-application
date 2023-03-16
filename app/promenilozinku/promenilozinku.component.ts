import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/Korisnik';

@Component({
  selector: 'app-promenilozinku',
  templateUrl: './promenilozinku.component.html',
  styleUrls: ['./promenilozinku.component.css']
})
export class PromenilozinkuComponent implements OnInit {

  constructor(private korisnikService:KorisniciService,private router:Router) { }

  ngOnInit(): void {
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.prijavljeniKor!=null){
      this.ulogovan=true;
      this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((kor:Korisnik)=>{
        this.prijavljeniKor=kor;})
      }
    }
prijavljeniKor:Korisnik;
ulogovan:boolean=false;
staralozinka:string;
novaPrviPut:string;
novaDrugiPut:string;
logout(){
  localStorage.removeItem("ulogovan");
  this.router.navigate(['']);
    this.ulogovan=false;
    
  }
  promeniLozinku(){
    let poruka=document.getElementById("stara");
    let poruka1=document.getElementById("format");
    let poruka2=document.getElementById("nisuiste");
    poruka.style.display="none";
    poruka1.style.display="none";
    poruka2.style.display="none";
    //proveri staru lozinku
if(this.prijavljeniKor.lozinka==this.staralozinka){
  console.log("iste")
//proveri format nove lozinke

const regex=new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/);
  const regexFirst=new RegExp(/^[A-Za-z][A-Za-z\d#$@!%&*?]*$/)
  if(regex.test(this.novaPrviPut) && regexFirst.test(this.novaPrviPut)){
console.log("dobra lozinka")
//proveri da li su dva puta unete iste vrednosti
if(this.novaPrviPut==this.novaDrugiPut){
//promeni lozinku u bazi
this.korisnikService.promeniPolje(this.prijavljeniKor.korime,'lozinka',this.novaPrviPut).subscribe((resObj) => {
  if (resObj['message'] == "ok") {
    console.log("PROMENJENA")
    localStorage.removeItem("ulogovan");
  this.router.navigate(['login']);
    this.ulogovan=false;
    
  }
})

}
else{
  poruka2.style.display="block";
}
  }else{
    console.log("regexxxx");
    poruka1.style.display="block";
  }
   

   
}
 else{
  
  poruka.style.display="block";
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
