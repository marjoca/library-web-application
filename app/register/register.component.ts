import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/Korisnik';

class ImageSnipet {
  constructor(public src: string, public file: File) {

  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private korisniciService: KorisniciService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }
  username: string;
  password: string = "";
  confirmedPassword: string;
  name: string;
  surname: string;
  address: string;
  telephone: string;
  email: string;
  imagename: string = "";

  selectedFile: ImageSnipet;
  selectedFile1: File;
  porukaPogresnaLozinka: string;
  porukaPostojiUsername: string;
  porukaPostojiEmail: string;

  sviZahtevi: Korisnik[];


  registrujse() {
    let message = document.getElementById("message");
    let message1 = document.getElementById("message1");
    let message2 = document.getElementById("message2");
    let message3 = document.getElementById("message3");
    let message4 = document.getElementById("message4");
    message.style.display = "none";
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
                let noviKor = new Korisnik(this.username, this.password, this.name, this.surname, this.address, this.telephone, this.email, this.imagename);
                this.sviZahtevi = JSON.parse(localStorage.getItem("sviZahtevi"));
                if (this.sviZahtevi == null) this.sviZahtevi = [];
                this.sviZahtevi.push(noviKor);

                localStorage.setItem("sviZahtevi", JSON.stringify(this.sviZahtevi));
                console.log(JSON.parse(localStorage.getItem("sviZahtevi")));
                message.style.display = "block";
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
  preusmerinaadmina() {
    this.router.navigate(['administrator']);
  }
  submit() {
    const formData = new FormData();
    formData.append('image', this.selectedFile1)

    this.korisniciService.upload(formData).subscribe(
      (res) => console.log(res)

    );
    console.log("DODATA SLIKA")
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