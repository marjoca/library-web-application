import { DeclareFunctionStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Komentar } from '../models/Komentar';
import { Korisnik } from '../models/Korisnik';

class ImageSnipet {
  constructor(public src: string, public file: File) {

  }
}
@Component({
  selector: 'app-detaljioknjizi',
  templateUrl: './detaljioknjizi.component.html',
  styleUrls: ['./detaljioknjizi.component.css']
})
export class DetaljioknjiziComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisniciService, private knjigaService: KnjigeService) { }

  ngOnInit(): void {
    this.knjiga = JSON.parse(localStorage.getItem("knjiga"));

    this.knjigaService.dohvKnjigu(this.knjiga.id).subscribe((k: Knjiga) => {
      this.knjiga = k;
      console.log(k)
       this.izracunajProsecnuOcenu();
      this.prijavljeniKor = JSON.parse(localStorage.getItem("ulogovan"));

      if (this.prijavljeniKor != null) {
        this.ulogovan = true;
        this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((kor: Korisnik) => {

          this.prijavljeniKor = kor;

          if(this.zaduzivaoJeOvuKnjigu())this.prikazi=true;
          if(this.daLiJeOstavioKomentar())this.azuriraj=true;
          else this.azuriraj=false;
          if (kor.tip == "citalac") {
            this.citalac = true;

            if (this.imaZaduzeno() == false) {
              if (this.knjiga.kolicina >= 1) {
                console.log("KOLICINA")
                //ako nema zaduženu ovu knjigu
                this.nemozedazaduzi = false;
                console.log("moze da zaduziii")
              } else {
                this.dugmerezervisi = true;
                this.nemadugme = true;
              }
            }
            else {
              this.nemadugme = true;
              //document.getElementById("disabled").setAttribute('disabled', '');
              console.log("KOLICINA222222")
            }

          }
          if (kor.tip == "moderator") this.moderator = true;

        })
      }
      if (this.knjiga.recenzije.length == 0) this.nemaRecenzija = true;//ako nema komentara i ocena ispisuje poruku
      this.recenzijeCitalaca();//ucitava tabelu recenzija citalaca
    })





  }

  knjiga: Knjiga;
  prijavljeniKor: Korisnik;
  ulogovan: boolean = false;
  nemozedazaduzi: boolean;
  nemaRecenzija: boolean;
  citalac: boolean = false;
  moderator: boolean = false;
  nemadugme: boolean = false;
  dugmerezervisi: boolean = false;
  azuriraj:boolean=false;
  logout() {
    localStorage.removeItem("ulogovan");
    this.router.navigate(['']);
    this.ulogovan = false;

  }

  zaduzi() {
    this.daLiMozeDaZaduzi();
    //dodaje se u niz zaduzenih knjiga kod korisnika
    if (!this.nemozedazaduzi) {

      //dohvatiti iy sesije rok koji je postavio admin, ako je postavio ako nije 14 je

      let rok = JSON.parse(localStorage.getItem("rok"));
      if (rok == null) rok = 14;

      this.korisnikService.zaduziKnjigu(this.prijavljeniKor.korime, this.knjiga.id, this.knjiga.naziv, this.knjiga.autor, this.knjiga.zanr, this.knjiga.izdavac, this.knjiga.godina, this.knjiga.jezik, this.knjiga.slika, this.knjiga.bruzimanja + 1, this.knjiga.ocene, this.knjiga.kolicina - 1, rok).subscribe((resObj) => {
        if (resObj['message'] == "ok") {
          console.log("zaduzena knjiga")
          this.daLiMozeDaZaduzi();
          this.ngOnInit();

        }
      })
      this.knjigaService.umanjiKolicinu(this.knjiga.id).subscribe((resObj) => {
        if (resObj['message'] == "ok") {
          console.log("umanjena kolicina")
        }
      })
      this.knjigaService.uvecajBrUzimanja(this.knjiga.id).subscribe((resObj) => {
        if (resObj['message'] == "ok") {
          console.log("uvecan broj uzimanja")
        }
      }

      )
      this.knjigaService.zaduzenaOdStrane(this.knjiga.id, this.prijavljeniKor.korime).subscribe((resObj) => {
        if (resObj['message'] == "ok") {
          console.log("radi zaduzena od strane")
        }
      }

      )
    }
  }

  daLiMozeDaZaduzi() {
    for (let i = 0; i < this.prijavljeniKor.zaduzenja.length; i++) {
      if (this.prijavljeniKor.zaduzenja[i].rok <= 0) {
        this.nemozedazaduzi = true;
      }
    }
    if (this.prijavljeniKor.zaduzenja.length == 3) {
      this.nemozedazaduzi = true;
    }
  }


  imaZaduzeno(): boolean {
    console.log("IMA ZADUZENO")
    for (let i = 0; i < this.prijavljeniKor.zaduzenja.length; i++) {
      if (this.knjiga.naziv == this.prijavljeniKor.zaduzenja[i].naziv) {
        console.log(this.prijavljeniKor.zaduzenja)
        console.log("true")
        return true;
      }
    }

    return false;

  }
prikazi:boolean=false;
  zaduzivaoJeOvuKnjigu():boolean{
  console.log("USLO")
      for(let i of this.prijavljeniKor.istorija){
        if(this.knjiga.id==i.id)return true;
      }
       return false;
    
    
  }
daLiJeOstavioKomentar():boolean{
  for(let r of this.knjiga.recenzije){
    if(r.korime==this.prijavljeniKor.korime){
      return true;
    }
  }
  return false;
}
  rezervisi() {
  this.knjigaService.dodajRezervaciju(this.knjiga.id,this.prijavljeniKor.korime).subscribe((resObj) => {
    if (resObj['message'] == "ok") {
      console.log("radi REZERVACIJA")
    }
  })
  }
  zvezdice() {

    const zvezdice = document.querySelectorAll('.star') as NodeListOf<HTMLElement>
    zvezdice.forEach((star, i) => {

      star.onclick = function () {
        let current_star_Level = i + 1;
        localStorage.setItem("ocena", JSON.stringify(current_star_Level));
        console.log(current_star_Level);///ovo je ocenicaaa
        zvezdice.forEach((star, j) => {
          if (current_star_Level >= j + 1) {
            star.innerHTML = '&#9733';

          }
          else {
            star.innerHTML = '&#9734';
          }
        })
      }
    })
  }
  ocena: number;
  komentar: string;
  prosecnaOcena: number;


  dodajRecenziju() {
    let datum = new Date();
    datum.toISOString();
    this.ocena = JSON.parse(localStorage.getItem("ocena"));
    //dodati i Vreme!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    this.knjigaService.dodajRecenziju(this.knjiga.id, this.prijavljeniKor.korime, this.ocena, this.komentar).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("radi inc br uzimanja")
      }
    });
  }
  azurirajRecenziju() {
    let datum = new Date();
    datum.toISOString();
    this.ocena = JSON.parse(localStorage.getItem("ocena"));
    //dodati i Vreme!!!!!!!!!!!!!!!!!!!!!!!!!!!!str1.concat(str2.toString())
this.knjigaService.obrisiRecenziju(this.prijavljeniKor.korime,this.knjiga.id).subscribe((resObj)=>{
  if (resObj['message'] == "ok") {
    console.log("uklonjena stara recenzija")
  }
})
    this.knjigaService.dodajRecenziju(this.knjiga.id, this.prijavljeniKor.korime, this.ocena, this.komentar.concat(" **ažurirano**") ).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azurirana recenzija")
      }
    });
  }
  recenzijeCitalaca() {

    const tableBody = document.getElementById('tableData');
    let dataHtml = '';
    for (let recenzija of this.knjiga.recenzije) {
      let datum = recenzija.datumivreme
      let dan = datum.toString().substring(8, 10);
      let mesec = datum.toString().substring(5, 7);
      let godina = datum.toString().substring(0, 4);
      let sati = (+(datum.toString().substring(11, 13))+2).toString();
      let minuti = datum.toString().substring(14, 16);

      dataHtml += `<tr><td>${recenzija.korime}</td><td><div class="stars-outer"><div class="stars-inner" id=${recenzija.korime}></div></div></td><td>${recenzija.komentar}</td><td>${dan}.${mesec}.${godina}. ${sati}:${minuti}</td></tr>`;


    }
    tableBody.innerHTML = dataHtml;

    for (let recenzija of this.knjiga.recenzije) {


      let zvezdezute = document.getElementById(recenzija.korime);

      console.log(zvezdezute)
      let brzvezdica = recenzija.ocena;

      switch (brzvezdica) {
        case 1: {
          zvezdezute.innerHTML = "&#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 2: {
          zvezdezute.innerHTML = "&#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 3: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 4: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 5: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 6: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733 &#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 7: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 8: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 9: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
        case 10: {
          zvezdezute.innerHTML = "&#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733 &#9733";
          zvezdezute.style.color = "#ff9900";
          break;
        }
      }


    }
  }
  izracunajProsecnuOcenu() {
    var suma=0;
for(let recenzija of this.knjiga.recenzije){
  suma+=recenzija.ocena;
}
console.log("PROSECNA OCENA")
this.prosecnaOcena=suma/this.knjiga.recenzije.length;
  }

  //moderator

  novNaziv: string;
  novAutor: string;
  novZanr: string[] = [];
  novIzdavac: string;
  novaGodina: number;
  novJezik: string;
  imagename: string = "";
  novaKolicina: number;
  promeninaziv() {
    this.knjigaService.promeniPolje(this.knjiga.id, 'naziv', this.novNaziv).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promeniautora() {
    var autori = this.novAutor.split(', ')
    this.knjigaService.promeniPolje(this.knjiga.id, 'autor', autori).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenizanr() {
    let poruka = document.getElementById("poruka");
    poruka.style.display = "none";
    if (this.novZanr.length > 3) {
      let poruka = document.getElementById("poruka");
      poruka.style.display = "block";
    }
    else {
      this.knjigaService.promeniPolje(this.knjiga.id, 'zanr', this.novZanr).subscribe((resObj) => {
        if (resObj['message'] == "ok") {
          console.log("azuriran korisnik!")
          /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
            this.knjiga=k;})*/
        }
      })
    }
  }
  promeniizdavaca() {
    this.knjigaService.promeniPolje(this.knjiga.id, 'izdavac', this.novIzdavac).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenigodinu() {
    this.knjigaService.promeniPolje(this.knjiga.id, 'godina', this.novaGodina).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenijezik() {
    this.knjigaService.promeniPolje(this.knjiga.id, 'jezik', this.novJezik).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  promenisliku() {
    if (this.imagename == "") {
      this.imagename = "clip-art-book-16.jpg";
    }
    this.knjigaService.promeniPolje(this.knjiga.id, 'slika', this.imagename).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azuriran korisnik!")
        /*this.knjigaService.dohvKnjigu(this.knjiga.naziv).subscribe((k:Knjiga)=>{
          this.knjiga=k;})*/
      }
    })
  }
  oniKojimaJeOdobrenaRezervacija:Array<String>=[];
  promenikolicinu() {
    this.knjigaService.promeniPolje(this.knjiga.id, 'kolicina', this.novaKolicina).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("azurirana KOLICINA")
        



      }
    })
    
  }


 
 
  kasniSaVracanjem(korisnik): boolean {
    for (let z of korisnik.zaduzenja) {
      if (z.rok < 0) {
        return true;
      }
    }
    return false;
  }
  selectedFile: ImageSnipet;
  selectedFile1: File;

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
