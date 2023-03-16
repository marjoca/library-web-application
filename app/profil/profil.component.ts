import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/Korisnik';
import Chart from 'chart.js/auto';
class ImageSnipet {
  constructor(public src: string, public file: File) {

  }
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {



  constructor(private router: Router, private korisnikService: KorisniciService, private knjigaService: KnjigeService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.prijavljeniKor = JSON.parse(localStorage.getItem("ulogovan"));
    if (this.prijavljeniKor.korime.toString() == "admin") {
      this.admin = true;
      this.azuriraj = JSON.parse(localStorage.getItem("azuriraj"));
      this.dohvAzuriranog(this.azuriraj.korime);
      console.log(this.azuriraj)

    } else {
      this.ulogovan=true;
      this.azuriraj = this.prijavljeniKor;
      this.dohvAzuriranog(this.prijavljeniKor.korime)


    }

  }
  prijavljeniKor: Korisnik;
  ulogovan: boolean=false;
  azuriraj: Korisnik;
  admin: boolean = false;


  logout() {
    localStorage.removeItem("ulogovan");
    this.router.navigate(['']);
    this.ulogovan = false;

  }
  dohvAzuriranog(korime) {
    this.korisnikService.dohvKorisnika(korime).subscribe((k: Korisnik) => {
      console.log(k)
      this.azuriraj = k;
      if(this.admin==false){
        this.dohvatiPodatke();
        this.grafik();
      }
      if(k.status=="blokiran"){
        console.log("BLOKIRAN")
        let promenalozinke=document.getElementById("promenalozinke");
        let zahtev=document.getElementById("zahtev");
       
        promenalozinke.style.display="none";
        zahtev.style.display="none";
        
      }
    })
  }
  novoIme: string;
  novoPrezime: string;
  novaAdresa: string;
  novTelefon: string;
  promeniime() {
    this.korisnikService.promeniPolje(this.azuriraj.korime, 'ime', this.novoIme).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        this.dohvAzuriranog(this.azuriraj.korime);
      }

    })
  }
  promeniprezime() {
    this.korisnikService.promeniPolje(this.azuriraj.korime, 'prezime', this.novoPrezime).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        this.dohvAzuriranog(this.azuriraj.korime);
      }

    })
  }
  promeniadresu() {
    this.korisnikService.promeniPolje(this.azuriraj.korime, 'adresa', this.novaAdresa).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        this.dohvAzuriranog(this.azuriraj.korime);
      }

    })
  }
  promenitelefon() {
    this.korisnikService.promeniPolje(this.azuriraj.korime, 'telefon', this.novTelefon).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        this.dohvAzuriranog(this.azuriraj.korime);
      }

    })
  }

  //PROMENA SLIKE
  selectedFile: ImageSnipet;
  selectedFile1: File;
  imagename: string = "";

  dodajSliku(event) {
    this.selectedFile1 = event.target.files[0];

    const img = document.querySelector('#photo');
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

    this.korisnikService.upload(formData).subscribe(
      (res) => console.log(res)

    );
    this.korisnikService.promeniPolje(this.azuriraj.korime, 'slika', this.imagename).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azurirana slika!")
        this.dohvAzuriranog(this.azuriraj.korime);
      }

    })
  }
  obrisiZaduzenje(z) {
    this.korisnikService.vratiKnjigu(z.naziv, this.azuriraj.korime).subscribe((resObj) => {

    })
    this.knjigaService.uvecajKolicinu(z.id).subscribe(() => { })
    this.korisnikService.upisiUIstoriju(z.id,z.naziv, this.azuriraj.korime, z.autor, z.datumzaduzivanja, z.zanr).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("radi ISTORIJA")
      }
    })


    this.dohvAzuriranog(this.azuriraj.korime);



  }
  rok: number;
  produziRok(z) {
    //dohvata rok iz sesije
    this.rok = JSON.parse(localStorage.getItem("rok"));
    console.log(this.rok);
    this.korisnikService.produziRok(this.azuriraj.korime, z.naziv, z.rok + this.rok).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("radi produzenje roka")
        this.korisnikService.produzavaoJe(this.prijavljeniKor.korime, z.naziv).subscribe(() => {
          this.dohvAzuriranog(this.azuriraj.korime);
        })

      }
    })
  }

  brKnjiga: number[];
  brKnjigaPoZanrovima: number[];
  dohvatiPodatke() {
    this.brKnjiga = new Array(12).fill(0);
    this.brKnjigaPoZanrovima = new Array(13).fill(0);
    for (let k of this.azuriraj.istorija) {
      let mesec = +k.datumvracanja.toString().substring(5, 7);
      let zanr = k.zanr;
      for (let z of zanr) {
        switch (z) {
          case "drama": {
            this.brKnjigaPoZanrovima[0]++;
            break;
          }
          case "naucna fantastika": {
            this.brKnjigaPoZanrovima[1]++;
            break;
          }
          case "kriminalistika": {
            this.brKnjigaPoZanrovima[2]++;
            break;
          }
          case "detektivski roman": {
            this.brKnjigaPoZanrovima[3]++;
            break;
          }
          case "klasicna knjizevnost": {
            this.brKnjigaPoZanrovima[4]++;
            break;
          }
          case "tragedija": {
            this.brKnjigaPoZanrovima[5]++;
            break;
          }
          case "psihologija": {
            this.brKnjigaPoZanrovima[6]++;
            break;
          }
          case "biografija": {
            this.brKnjigaPoZanrovima[7]++;
            break;
          }
          case "enciklopedija": {
            this.brKnjigaPoZanrovima[8]++;
            break;
          }
          case "horor": {
            this.brKnjigaPoZanrovima[9]++;
            break;
          }
          case "poezija": {
            this.brKnjigaPoZanrovima[10]++;
            break;
          }
          case "triler": {
            this.brKnjigaPoZanrovima[11]++;
            break;
          }
          case "komedija": {
            this.brKnjigaPoZanrovima[12]++;
            break;
          }
        }
      }
      switch (mesec) {
        case 1: {

          this.brKnjiga[0]++;
          break;
        }
        case 2: {

          this.brKnjiga[1]++;
          break;
        }
        case 3: {

          this.brKnjiga[2]++;
          break;
        }
        case 4: {

          this.brKnjiga[3]++;
          break;
        }
        case 5: {

          this.brKnjiga[4]++;
          break;
        }
        case 6: {

          this.brKnjiga[5]++;
          break;
        }
        case 7: {

          this.brKnjiga[6]++;
          break;
        }
        case 8: {
          console.log("radi avgust")
          this.brKnjiga[7]++;
          break;
        }
        case 9: {

          this.brKnjiga[8]++;
          break;
        }
        case 10: {

          this.brKnjiga[9]++;
          break;
        }
        case 11: {

          this.brKnjiga[10]++;
          break;
        }
        case 12: {

          this.brKnjiga[11]++;
          break;
        }
      }
    }
    console.log(this.brKnjiga)
    console.log(this.brKnjigaPoZanrovima)
  }



  grafik() {


    var myChart = new Chart("canvas", {
      type: 'bar',
      data: {
        labels: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun'
          , 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
        datasets: [{
          label: '# broj pročitanih knjiga',
          data: this.brKnjiga,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
    var myChart2 = new Chart("canvas2", {
      type: 'bar',
      data: {
        labels: ['drama', 'naucna fantastika', 'krimi roman', 'detektivski roman', 'klasična književnost', 'tragedija','psihologija','biografija','enciklopedija','horor','poezija','triler','komedija'],
        datasets: [{
          label: '# broj pročitanih knjiga po žanrovima',
          data: this.brKnjigaPoZanrovima,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
  podigni(){
this.korisnikService.promeniTip(this.azuriraj.korime,'moderator').subscribe(()=>{
  this.dohvAzuriranog(this.azuriraj.korime);
})
  }
  smanji(){
    this.korisnikService.promeniTip(this.azuriraj.korime,'citalac').subscribe(()=>{
      this.dohvAzuriranog(this.azuriraj.korime);
    })
  }
  blokiraj(){
    this.korisnikService.blockunblock(this.azuriraj.korime,'blokiran').subscribe(()=>{
      this.dohvAzuriranog(this.azuriraj.korime);
    })
  }
  odblokiraj(){
    this.korisnikService.blockunblock(this.azuriraj.korime,'odblokiran').subscribe(()=>{
      this.dohvAzuriranog(this.azuriraj.korime);
    })
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
















/*vratiKnjigu(k){
    this.korisnikService.vratiKnjigu(k.naziv,this.prijavljeniKor.korime).subscribe(()=>{
   
    })
    this.knjigaService.uvecajKolicinu(k.naziv).subscribe(()=>{})
    //dohvatam datumzaduzenja


console.log(k.datumzaduzenja)
    this.korisnikService.upisiUIstoriju(k.naziv,this.prijavljeniKor.korime,k.autor,k.datumzaduzivanja).subscribe((resObj)=>{
      if(resObj['message']=="ok"){
       console.log("radi ISTORIJA")}})
    this.dohvKorisnika();
  }*/