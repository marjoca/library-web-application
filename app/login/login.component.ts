import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/Korisnik';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisniciService: KorisniciService,private router:Router) { }

  ngOnInit(): void {
  }
  username:string;
  password:string;
  message:string;
login(){
  console.log("ok")
  console.log(this.username)
  console.log(this.password)
this.korisniciService.login(this.username,this.password).subscribe((korisnikIzBaze:Korisnik)=>{
  if(korisnikIzBaze!=null){
    console.log("ulaziii")

if(korisnikIzBaze.tip.toString()=="administrator"){
  this.message="Neispravno uneti podaci!"
  
}
if(korisnikIzBaze.tip.toString()=="moderator"){
  console.log("MODERATOR")
  localStorage.setItem("ulogovan", JSON.stringify(korisnikIzBaze));
  this.router.navigate(['moderator']);
}
if(korisnikIzBaze.tip.toString()=="citalac"){
  localStorage.setItem("ulogovan", JSON.stringify(korisnikIzBaze));

  this.router.navigate(['']);
}

}

else{
  this.message="Neispravno uneti podaci!"
}
})
}
}
