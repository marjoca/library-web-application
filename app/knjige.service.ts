import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  constructor(private http:HttpClient) { }
dohvSveKnjige(){
  
  return this.http.get('http://localhost:4000/knjige/dohvSveKnjige');
}
pretraziKnjige(parametar,zanrovi,odperiod,doperiod,izdavac){
const data={
  parametar:parametar,
  zanrovi:zanrovi,
  odperiod:odperiod,
  doperiod:doperiod,
  izdavac:izdavac

}
return this.http.post('http://localhost:4000/knjige/pretraziKnjige',data);
}
uvecajKolicinu(id){
  const data={
    id:id
  }
  return this.http.post('http://localhost:4000/knjige/uvecajKolicinu',data); 
}
umanjiKolicinu(id){
  const data={
    id:id
  }
  return this.http.post('http://localhost:4000/knjige/umanjiKolicinu',data); 
}
uvecajBrUzimanja(id){
  const data={
    id:id
  }
  return this.http.post('http://localhost:4000/knjige/uvecajBrUzimanja',data); 
}
dohvKnjigu(id){
  const data={
    id:id
  }
  return this.http.post('http://localhost:4000/knjige/dohvKnjigu',data);
 }
dodajRecenziju(id,korime,ocena,komentar){
  const data={
    id:id,
    korime:korime,
    ocena:ocena,
    komentar:komentar
    
    
  }
  return this.http.post('http://localhost:4000/knjige/dodajRecenziju',data);
 }
 obrisiRecenziju(korime,id){
  const data={
    
    korime:korime,
    id:id
    }
  return this.http.post('http://localhost:4000/knjige/obrisiRecenziju',data);
 }
 zaduzenaOdStrane(id,korime){
  const data={
    id:id,
    korime:korime
    }
  return this.http.post('http://localhost:4000/knjige/zaduzenaOdStrane',data);
 }
 izbaciIzZaduzenaOdStrane(id,korime){
const data={
  id:id,
  korime:korime
}
return this.http.post('http://localhost:4000/knjige/izbaciIzZaduzenaOdStrane',data);
 }
 obrisiKnjigu(id){
  const data={
    id:id,
    
  }
  return this.http.post('http://localhost:4000/knjige/obrisiKnjigu',data);
 }
 dodajKnjigu(naziv,autor,zanr,izdavac,godina,jezik,imagename){
  const data={
    naziv:naziv,
    autor:autor,
    zanr:zanr,
    izdavac:izdavac,
    godina:godina,
    jezik:jezik,
    slika:imagename
}
  return this.http.post('http://localhost:4000/knjige/dodajKnjigu',data);
 }
 promeniPolje(id,polje,novo){
  const data={
    id:id,
    polje:polje,
    novo:novo
}
  return this.http.post('http://localhost:4000/knjige/promeniPolje',data);
 }
 dodajRezervaciju(id,korime){
  const data={
    id:id,
    korime:korime
    
}
return this.http.post('http://localhost:4000/knjige/dodajRezervaciju',data);
}
izbaciIzRezervacije(id,korime){
  const data={
    id:id,
    korime:korime
    
}
return this.http.post('http://localhost:4000/knjige/izbaciIzRezervacije',data);
}
}
