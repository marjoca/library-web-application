import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisniciService } from '../korisnici.service';
import { Knjiga } from '../models/Knjiga';
import { Korisnik } from '../models/Korisnik';

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisniciService, private knjigaService: KnjigeService) { }

  ngOnInit(): void {
    this.prijavljeniKor = JSON.parse(localStorage.getItem("ulogovan"));
    if (this.prijavljeniKor != null) {

      this.ulogovan = true;
      this.dohvKorisnika();

    }
  }
  prijavljeniKor: Korisnik;
  ulogovan: boolean = false;
  zaduzeneKnjige: Knjiga[] = [];
  imaknjiga: boolean;
  blokiran:boolean=false;
  logout() {
    localStorage.removeItem("ulogovan");
    this.router.navigate(['']);
    this.ulogovan = false;

  }
  detaljiOKnjizi(k) {
    localStorage.setItem("knjiga", JSON.stringify(k));
    this.router.navigate(['detaljioknjizi']);
  }
  dohvKorisnika() {
    this.korisnikService.dohvKorisnika(this.prijavljeniKor.korime).subscribe((kor: Korisnik) => {
      this.prijavljeniKor=kor;
      this.zaduzeneKnjige = kor.zaduzenja;
      console.log(this.zaduzeneKnjige)
      if (this.zaduzeneKnjige.length != 0) {
        this.imaknjiga = true;
        if(kor.status=="blokiran"){
          console.log("BLOKIRAN")
          let promenalozinke=document.getElementById("promenalozinke");
          let zahtev=document.getElementById("zahtev");
          this.blokiran=true;
          promenalozinke.style.display="none";
          zahtev.style.display="none";
          
        }
        else{
          this.blokiran=false;
        }
      }
      else {
        this.imaknjiga = false;
      }
      
    })
  }

  vratiKnjigu(k) {
    this.korisnikService.vratiKnjigu(k.id, this.prijavljeniKor.korime).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("MRš")
        this.dohvKorisnika();
      }
    }
    )
    this.knjigaService.uvecajKolicinu(k.id).subscribe(() => { })
    //dohvatam datumzaduzenja



    this.korisnikService.upisiUIstoriju(k.id, k.naziv, this.prijavljeniKor.korime, k.autor, k.datumzaduzivanja, k.zanr).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("radi ISTORIJA")
        this.dohvKorisnika();


      }
    })
    this.knjigaService.izbaciIzZaduzenaOdStrane(k.id, this.prijavljeniKor.korime).subscribe((resObj) => {
      if (resObj['message'] == "ok") {
        console.log("MRš")
        this.dohvKorisnika();
      }
    })
    if (this.prijavljeniKor.odobrenaRezervacija.length != 0) {
      for (let r of this.prijavljeniKor.odobrenaRezervacija) {
        if (k.id == r.id) {
          this.korisnikService.skloniOdobrenaRezervacija(this.prijavljeniKor.korime, r.id).subscribe((resObj) => {
            if (resObj['message'] == "ok") {
              console.log("OBAVESTENJE")
              this.dohvKorisnika();
            }
          })
        }
      }
    }
    this.knjigaService.dohvKnjigu(k.id).subscribe((k: Knjiga) => {
      //nadjem koji korisnik od onih koji su rezervisali zadovoljava uslov da zaduzi knjigu
      let korisnik;
      let gotovo: boolean = false;
      let sviKojiSuRezervisali: Korisnik[] = [];
      if (k.rezervacije.length != 0) {
        for (let i = 0; i < k.rezervacije.length; i++) {
          this.korisnikService.dohvKorisnika(k.rezervacije[i].korime).subscribe((kor: Korisnik) => {
            sviKojiSuRezervisali.push(kor);
            if (sviKojiSuRezervisali.length == k.rezervacije.length) {
              for (let i=0;i<sviKojiSuRezervisali.length && gotovo==false;i++) {
                if (sviKojiSuRezervisali[i].zaduzenja.length < 3 && this.kasniSaVracanjem(sviKojiSuRezervisali[i]) == false) {
                  gotovo=true;
                  korisnik = sviKojiSuRezervisali[i];
                  if (korisnik != null) {
                    //REZERVISI
                    let rok = JSON.parse(localStorage.getItem("rok"));
                    if (rok == null) rok = 14;
                    this.korisnikService.zaduziKnjigu(korisnik.korime, k.id, k.naziv, k.autor, k.zanr, k.izdavac, k.godina, k.jezik, k.slika, k.bruzimanja + 1, k.ocene, k.kolicina - 1, rok).subscribe((resObj) => {
                      if (resObj['message'] == "ok") {
                        console.log("ZADUZENA KOJA JE BILA REZERVISANA")
                        this.knjigaService.umanjiKolicinu(k.id).subscribe((resObj) => {
                          if (resObj['message'] == "ok") {
                            console.log("umanjena kolicina")
                            this.knjigaService.uvecajBrUzimanja(k.id).subscribe((resObj) => {
                              if (resObj['message'] == "ok") {
                                console.log("uvecan broj uzimanja")
                                this.knjigaService.zaduzenaOdStrane(k.id, korisnik.korime).subscribe((resObj) => {
                                  if (resObj['message'] == "ok") {
                                    console.log("radi zaduzena od strane")
                                    this.knjigaService.izbaciIzRezervacije(k.id, korisnik.korime).subscribe((resObj) => {
                                      if (resObj['message'] == "ok") {
                                        console.log("izbacena iz rezervacije18181188")
                                        this.korisnikService.odobrenaRezervacija(korisnik.korime, k.id).subscribe((resObj) => {
                                          if (resObj['message'] == "ok") {
                                            console.log("dodat u odobrene REZERVACIJE")
                                            gotovo = true;
                                          }
                                        })
          
                                      }
                                    })
                                  }
                                })
                              }
                            })
                          }
          
                        })
          
                      }
                    })
                  }
                }
              }
            }
          })
        }
       



      }

    })
  }

  produzi(k) {
    let rok = JSON.parse(localStorage.getItem("rok"));
    if (rok == null) rok = 14;
    this.korisnikService.produziRok(this.prijavljeniKor.korime, k.naziv, k.rok + rok).subscribe(() => {
      this.korisnikService.produzavaoJe(this.prijavljeniKor.korime, k.naziv).subscribe(() => {
        this.dohvKorisnika();
      })

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
  kliknuto: boolean = false;
  prikaziMeni() {
    let meni = document.getElementById("meni");
    meni.style.display = "block";
    if (this.kliknuto == false) this.kliknuto = true;
    else {
      this.kliknuto = false;
      meni.style.display = "none"
    }
  }
}
