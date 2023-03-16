import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/Korisnik';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private korisniciService:KorisniciService,private router:Router) { }

  ngOnInit(): void {
  }
username:string;
password:string;

login(){
  let poruka=document.getElementById("poruka");
  poruka.style.display="none";
  this.korisniciService.login(this.username,this.password).subscribe((korisnikIzBaze:Korisnik)=>{
    if(korisnikIzBaze!=null){
      console.log("ulaziii")
  
  if(korisnikIzBaze.tip.toString()=="administrator"){
    console.log("ULAZI")
    localStorage.setItem("ulogovan", JSON.stringify(korisnikIzBaze));
    this.router.navigate(['administrator']);
    
  }
else{
  poruka.style.display="block";
}}
  
  
  
  else{
    poruka.style.display="block";
  }
  })
  
}
}
