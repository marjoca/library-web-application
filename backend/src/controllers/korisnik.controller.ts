import express from 'express'
import KorisnikModel from '../models/korisnik'
import { KnjigaController } from './knjiga.controller';
export class KorisnikController{
    login=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;
        
        KorisnikModel.findOne({'korime':username,'lozinka':password},(err,korisnik)=>{
            if(err)console.log(err)
            else res.json(korisnik)
        })
    }
    registruj=(req:express.Request,res:express.Response)=>{
        let noviKorisnik=new KorisnikModel({
            korime:req.body.korime,
            lozinka:req.body.lozinka,
           ime:req.body.ime,
            prezime:req.body.prezime,
            adresa:req.body.adresa,
            telefon:req.body.telefon,
            email:req.body.email,
            slika:req.body.slika,
            tip:"citalac",
            status:"odblokiran"
        })
        noviKorisnik.save((err,resp)=>{
            if(err)console.log(err)
            else res.json("ok")
        })

    }
    proveriUsername=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        KorisnikModel.findOne({'korime':korime},(err,korisnik)=>{
            if(err)console.log(err);
            else{
                res.json(korisnik)
            }
        })
    }
    proveriEmail=(req:express.Request,res:express.Response)=>{
        let email=req.body.email;
        KorisnikModel.findOne({'email':email},(err,korisnik)=>{
            if(err)console.log(err);
            else{
                res.json(korisnik)
            }
        })
    }
    dohvKorisnika=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        KorisnikModel.findOne({'korime':korime},(err,korisnik)=>{
            if(err)console.log(err);
            else{
                res.json(korisnik)
            }
        })
    }
    vratiKnjigu=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let id=req.body.id;
        KorisnikModel.updateOne({'korime':korime},{$pull:{zaduzenja:{'id':id}}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
            }
        })
    }

    upisiUIstoriju=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;
        let naziv=req.body.naziv;
        let autor=req.body.autor;
        let datumzaduzenja=req.body.datumzaduzenja;
        let zanr=req.body.zanr;
        KorisnikModel.updateOne({'korime':korime},{$push:{'istorija':{$each:[{'id':id,'naziv':naziv,'autor':autor,'zanr':zanr,'datumzaduzivanja':datumzaduzenja,'datumvracanja':new Date()}],$sort:{'datumvracanja':-1}}}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }

    zaduziKnjigu=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;   //{ $push: { "achieve": 95 } }
        let naziv=req.body.naziv;
        let autor=req.body.autor;
        let zanr=req.body.zanr;
        let izdavac=req.body.izdavac;
        let godina=req.body.godina;
        let jezik=req.body.jezik;
        let slika=req.body.slika;
        let bruzimanja=req.body.bruzimanja;
        let ocene=req.body.ocene;
        let kolicina=req.body.kolicina;
        let rok=req.body.rok;
       
        KorisnikModel.updateOne({'korime':korime},{$push:{'zaduzenja':{'id':id,'naziv':naziv,'autor':autor,'zanr':zanr,'izdavac':izdavac,'godina':godina,'jezik':jezik,'slika':slika,'bruzimanja':bruzimanja,'ocene':ocene,'kolicina':kolicina,'rok':rok,'datumzaduzivanja':new Date(),'produzio':false}}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    dohvKorisnike=(req:express.Request,res:express.Response)=>{
        KorisnikModel.find({},(err,korisnici)=>{
             if(err)console.log(err)
             else res.json(korisnici)
         })
     }
     obrisiKorisnika=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        
        
        KorisnikModel.deleteOne({'korime':korime},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    promeniPolje=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let polje=req.body.polje;
        let novavrednost=req.body.novavrednost;
        
        if(polje=="ime"){
        KorisnikModel.updateOne({'korime': korime}, {$set: {'ime': novavrednost}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="lozinka"){
        KorisnikModel.updateOne({'korime': korime}, {$set: {'lozinka': novavrednost}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="prezime"){
        KorisnikModel.updateOne({'korime': korime}, {$set: {'prezime': novavrednost}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="adresa"){
        KorisnikModel.updateOne({'korime': korime}, {$set: {'adresa': novavrednost}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="telefon"){
        KorisnikModel.updateOne({'korime': korime}, {$set: {'telefon': novavrednost}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="slika"){
        KorisnikModel.updateOne({'korime': korime}, {$set: {'slika': novavrednost}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    }
    produziRok=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let naziv=req.body.naziv;
        let rok=req.body.rok;
        
        KorisnikModel.updateOne({'korime':korime,'zaduzenja.naziv':naziv},{$set:{'zaduzenja.$.rok':rok}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    produzavaoJe=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let naziv=req.body.naziv;
       
        KorisnikModel.updateOne({'korime':korime,'zaduzenja.naziv':naziv},{$set:{'zaduzenja.$.produzio':true}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    promeniTip=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let tip=req.body.tip;
        
        
        
        KorisnikModel.updateOne({'korime': korime}, {$set: {'tip': tip}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    blockunblock=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let status=req.body.status;
        
        
        
        KorisnikModel.updateOne({'korime': korime}, {$set: {'status': status}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    odobreniPredlozi=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let naziv=req.body.naziv;
       
        KorisnikModel.updateOne({'korime':korime},{$push:{'odobreniPredlozi':naziv}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    odobrenaRezervacija=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let id=req.body.id;
       
        KorisnikModel.updateOne({'korime':korime},{$push:{'odobrenaRezervacija':{'id':id}}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    skloniOdobrenaRezervacija=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let id=req.body.id;
       
        KorisnikModel.updateOne({'korime':korime},{$pull:{'odobrenaRezervacija':{'id':id}}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
}