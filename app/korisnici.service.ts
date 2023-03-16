import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  constructor(private http:HttpClient) { }
  login(usernamefromform,passwordfromform){
    const data={
      username:usernamefromform,
      password:passwordfromform,
     
    }
    return this.http.post('http://localhost:4000/korisnik/login',data);
  }
  registruj(username,password,name,surname,address,telephone,email,image){
    const data={
      korime:username,
      lozinka:password,
      ime:name,
      prezime:surname,
      adresa:address,
      telefon:telephone,
      email:email,
      slika:image
      
    }
    return this.http.post('http://localhost:4000/korisnik/registruj',data);
  }
  proveriUsername(username){
    const data={
      korime:username
    }
    return this.http.post('http://localhost:4000/korisnik/proveriUsername',data);
  }
  proveriEmail(email){
    const data={
      email:email
    }
    return this.http.post('http://localhost:4000/korisnik/proveriEmail',data);
  }
 upload(formdata){
  
  return this.http.post('http://localhost:4000/file',formdata);
 }
 dohvKorisnika(korime){
  const data={
    korime:korime
  }
  return this.http.post('http://localhost:4000/korisnik/dohvKorisnika',data);
 }
 vratiKnjigu(id,korime){
  const data={
    id:id,
    korime:korime
  }
  return this.http.post('http://localhost:4000/korisnik/vratiKnjigu',data);
 }
 zaduziKnjigu(korime,id,naziv,autor,zanr,izdavac,godina,jezik,slika,bruzimanja,ocene,kolicina,rok){
  const data={
    
    korime:korime,
    id:id,
    naziv:naziv,
    autor:autor,
    zanr:zanr,
    izdavac:izdavac,
    godina:godina,
    jezik:jezik,
    slika:slika,
    bruzimanja:bruzimanja,
    ocene:ocene,
    kolicina:kolicina,
    rok:rok,
    
  }
  return this.http.post('http://localhost:4000/korisnik/zaduziKnjigu',data);
 }
 upisiUIstoriju(id,naziv,korime,autor,datumzaduzenja,zanr){
  const data={
    id:id,
    naziv:naziv,
    korime:korime,
    autor:autor,
    datumzaduzenja:datumzaduzenja,
    zanr:zanr
  }
  return this.http.post('http://localhost:4000/korisnik/upisiUIstoriju',data);
 }
 dohvKorisnike(){
  return this.http.get('http://localhost:4000/korisnik/dohvKorisnike');
 }
 obrisiKorisnika(korime){
const data={
  korime:korime
}
return this.http.post('http://localhost:4000/korisnik/obrisiKorisnika',data);
 }
 promeniPolje(korime,polje,novavrednost){
  const data={
    korime:korime,
    polje:polje,
    novavrednost:novavrednost
  }
  return this.http.post('http://localhost:4000/korisnik/promeniPolje',data);
 }
 produziRok(korime,naziv,rok){
  const data={
    korime:korime,
    naziv:naziv,
    rok:rok
  }
  return this.http.post('http://localhost:4000/korisnik/produziRok',data);
 }
 produzavaoJe(korime,naziv){
  const data={
    korime:korime,
    naziv:naziv
   
  }
  return this.http.post('http://localhost:4000/korisnik/produzavaoJe',data);
 }
 promeniTip(korime,tip){
  const data={
    korime:korime,
    tip:tip
   
  }
  return this.http.post('http://localhost:4000/korisnik/promeniTip',data); 
 }
 blockunblock(korime,status){
  const data={
    korime:korime,
   status:status
   
  }
  return this.http.post('http://localhost:4000/korisnik/blockunblock',data); 
 }
 odobreniPredlozi(korime,naziv){
  const data={
    korime:korime,
   naziv:naziv
   
  }
  return this.http.post('http://localhost:4000/korisnik/odobreniPredlozi',data); 
 }
 odobrenaRezervacija(korime,id){
  const data={
    korime:korime,
   id:id
   
  }
  return this.http.post('http://localhost:4000/korisnik/odobrenaRezervacija',data); 
 }
 skloniOdobrenaRezervacija(korime,id){
  const data={
    korime:korime,
   id:id
   
  }
  return this.http.post('http://localhost:4000/korisnik/skloniOdobrenaRezervacija',data); 
 }
}
