import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';

class ImageSnipet{
  constructor(public src:string,public file:File){

  }}
@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private korisniciService:KorisniciService,private router:Router,private knjigaService:KnjigeService) { }

  ngOnInit(): void {
    this.prijavljeniKor=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.prijavljeniKor!=null){
      this.ulogovan=true;
      console.log("ulogovan")
      }
    
 this.korisniciService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((kor:Korisnik)=>{
  this.prijavljeniKor=kor;

  this.ObrisiKorisnika();
  this.dohvKnjigeKojeNisuZaduzene();
 });
    this.sviZahtevi=JSON.parse(localStorage.getItem("sviZahtevi"));
    if(this.sviZahtevi!=null){
    if(this.sviZahtevi.length==0){
      let message=document.getElementById("message");
      console.log("NEMA ZAHTEVA")
      message.textContent="Nema pristiglih zahteva za registraciju";
      message.style.backgroundColor="#42f57b";
    }}
    this.knjigaService.dohvSveKnjige().subscribe((k:Knjiga[])=>{
      this.knjige=k;
      console.log(this.knjige)
    })
  }
sviZahtevi:Korisnik[];
username:string;
password:string;
confirmedPassword:string;
name:string;
surname:string;
address:string;
telephone:string;
email:string;


//novo
ulogovan:boolean;
prijavljeniKor:Korisnik;
korisnici:Korisnik[]=[];
knjige:Knjiga[]=[];


odobriZahtev(korime){
  console.log(korime);
  
  for( let i=0;i<this.sviZahtevi.length;i++){
    if(this.sviZahtevi[i].korime==korime){
      this.korisniciService.registruj(this.sviZahtevi[i].korime,this.sviZahtevi[i].lozinka,this.sviZahtevi[i].ime,this.sviZahtevi[i].prezime,this.sviZahtevi[i].adresa,this.sviZahtevi[i].telefon,this.sviZahtevi[i].email,this.sviZahtevi[i].slika).subscribe(()=>{
        console.log("DODAT KORISNIK")
        
        this.sviZahtevi.splice(i,1);
        
        console.log(this.sviZahtevi)
        localStorage.setItem("sviZahtevi", JSON.stringify(this.sviZahtevi));
      })
    }
  }
  this.ngOnInit();
}
odbijZahtev(korime){
  for( let i=0;i<this.sviZahtevi.length;i++){
    if(this.sviZahtevi[i].korime==korime){
      
        console.log("UKLONJEN KORISNIK")
        
        this.sviZahtevi.splice(i,1);
        
        console.log(this.sviZahtevi)
        localStorage.setItem("sviZahtevi", JSON.stringify(this.sviZahtevi));
      
    }
  }
  this.ngOnInit();
}

selectedFile: ImageSnipet;
selectedFile1: File;
imagename: string = "";

dodajSliku(event) {
  this.selectedFile1 = event.target.files[0];

  const img = document.querySelector('#photo2');
  const file: File = event.target.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event: any) => {
    console.log("okkk")
    this.selectedFile = new ImageSnipet(event.target.result, file);
    img.setAttribute('src', reader.result.toString());
    console.log(reader.result.toString())
    this.imagename = this.selectedFile.file.name;

    console.log(this.imagename);
  });
  reader.readAsDataURL(file);
}
submit() {
  const formData = new FormData();
  formData.append('image', this.selectedFile1)

  this.korisniciService.upload(formData).subscribe(
    (res) => console.log(res)

  );
  
}
registrujse(){
  let message5 = document.getElementById("message5");
  let message1 = document.getElementById("message1");
  let message2 = document.getElementById("message2");
  let message3 = document.getElementById("message3");
  let message4 = document.getElementById("message4");
  message5.style.display = "none";
  message1.style.display = "none";
  message2.style.display = "none";
  message3.style.display = "none";
  message4.style.display = "none";
  //treba proveriti da tog username nema u localstorageu u zahtevima
  this.korisniciService.proveriUsername(this.username).subscribe((kor: Korisnik) => {
    if (kor != null) {
      message2.style.display = "block";
      console.log("BOSKOOO")
    }
    else {
      //proveravam lozinku
      const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/);
      const regexFirst = new RegExp(/^[A-Za-z][A-Za-z\d#$@!%&*?]*$/)
      if (regex.test(this.password) && regexFirst.test(this.password)) {
        console.log("dobra lozinka")
        //proveravam da li se podudaraju
        if (this.password == this.confirmedPassword) {
          //sve ok idemo dalje proveravam email
          this.korisniciService.proveriEmail(this.email).subscribe((kor: Korisnik) => {
            if (kor != null) {
              message3.style.display = "block";
              console.log("postoji taj email")
            }
            else {
              //sve ok šalje se zahtev
              this.submit();
              if(this.imagename=="")this.imagename="image (1).jpg";
              this.korisniciService.registruj(this.username,this.password,this.name,this.surname,this.address,this.telephone,this.email,this.imagename).subscribe(()=>{
                message5.style.display = "block";
              });
             
            }
          })
        }
        else {
          message4.style.display = "block";
          console.log("ne podudaraju se")
        }

      } else {
        message1.style.display = "block";
        console.log("neispravan format")
      }
    }
  })





}
logout(){
  localStorage.removeItem("ulogovan");
  
  this.router.navigate(['']);
    this.ulogovan=false;
    
  }


  //ažurirajte ili obrišite korisnike
  //  1.dohvatam korisnike koji nemaju zadužene knjige, ispisujem ih u tabeli
  korisniciBezZaduzenja:Korisnik[]=[];
  ObrisiKorisnika(){
    this.korisniciBezZaduzenja=[];
    //  1.dohvatam korisnike koji nemaju zadužene knjige, ispisujem ih u tabeli
    this.korisniciService.dohvKorisnike().subscribe((k:Korisnik[])=>{
      this.korisnici=k;
      for(let i=0;i<k.length;i++){
        if(k[i].zaduzenja.length==0){
          this.korisniciBezZaduzenja.push(k[i]);
        }
      }
      
    })
  }
  obrisi(k){
    this.korisniciService.obrisiKorisnika(k.korime).subscribe((resObj)=>{
      if(resObj['message']=="ok"){
        console.log("obrisan korisnik!")
       
     }
     this.ObrisiKorisnika()
       
    })
  }
  azuriraj(k){
    localStorage.setItem("azuriraj", JSON.stringify(k));
    this.router.navigate(['profil']);
  }

  noviRok:number;
  rok:number;
  novoProduzenje:number;
  promeniRok(){
    localStorage.removeItem("rok");
    localStorage.setItem("rok", JSON.stringify(this.noviRok));
  }
  promeniProduzenje(){
    localStorage.removeItem("produzenje");
    localStorage.setItem("produzenje", JSON.stringify(this.novoProduzenje));
  }

  knjigeKojeNisuZaduzene:Knjiga[];
  dohvKnjigeKojeNisuZaduzene(){
    this.knjigeKojeNisuZaduzene=[];
    let knjige;
    this.knjigaService.dohvSveKnjige().subscribe((k:Knjiga[])=>{
knjige=k;
for(let k of knjige){
  if(k.zaduzenaOdStrane.length==0){
    this.knjigeKojeNisuZaduzene.push(k);
  }
}
console.log(this.knjigeKojeNisuZaduzene)
    })
    
  }
  obrisiKnjigu(k){
    this.knjigaService.obrisiKnjigu(k.id).subscribe((resObj)=>{
      if(resObj['message']=="ok"){
        console.log("obrisana knjiga!")
       
     }
     this.dohvKnjigeKojeNisuZaduzene();
    })
  }
  azurirajKnjigu(k){
    //stavim knjigu u sesiju i odem na novu stranu azuriraj knjigu
    localStorage.setItem("knjiga", JSON.stringify(k));
    this.router.navigate(['azurirajknjigu']);
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
