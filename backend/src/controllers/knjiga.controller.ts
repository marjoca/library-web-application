import express from 'express'

import KnjigaModel from '../models/knjiga'
export class KnjigaController{
    dohvSveKnjige=(req:express.Request,res:express.Response)=>{
       KnjigaModel.find({},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
    }
    pretraziKnjige=(req:express.Request,res:express.Response)=>{
        let parametar=req.body.parametar;
        let odperiod=req.body.odperiod;
        let doperiod=req.body.doperiod;
        let izdavac=req.body.izdavac;
        let zanrovi:Array<String>=req.body.zanrovi;
        console.log(zanrovi)
        console.log("ulazii");
      if(odperiod==null && doperiod==null && izdavac=="" && zanrovi.length==0){
        console.log("samo autor i naziv")
        KnjigaModel.find({$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
             if(err)console.log(err)
             else res.json(knjige)
         })
      }
      if(izdavac!="" && odperiod==null && doperiod==null && zanrovi.length==0){
        console.log("radi izdavac")
        KnjigaModel.find({'izdavac':izdavac,$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
      }
      if(izdavac!="" && odperiod!=null && doperiod==null && zanrovi.length==0){
        console.log("radi odperiod i izdavac")//quantity: { $gt: 20 }
        KnjigaModel.find({'godina':{$gte:odperiod},'izdavac':izdavac,$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
      }
      if(izdavac!="" && odperiod==null && doperiod!=null && zanrovi.length==0){
        console.log("radi doperiod i izdavac")//quantity: { $gt: 20 }
        KnjigaModel.find({'godina':{$lt:doperiod},'izdavac':izdavac,$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
      }
      if(izdavac=="" && odperiod!=null && doperiod==null && zanrovi.length==0){
        console.log("radi odperiod")//quantity: { $gt: 20 }
        KnjigaModel.find({'godina':{$gte:odperiod},$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
      }
      if(izdavac=="" && odperiod!=null && doperiod!=null && zanrovi.length==0){
        console.log("radi odperiod i doperiod")// db.test.find({ b : { $gt :  4, $lt : 6}});
        KnjigaModel.find({'godina':{$gte:odperiod,$lt:doperiod},$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
      }
      if(izdavac=="" && odperiod==null && doperiod!=null && zanrovi.length==0){
        console.log("radi doperiod")// db.test.find({ b : { $gt :  4, $lt : 6}});
        KnjigaModel.find({'godina':{$lt:doperiod},$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
      }
      if(izdavac!="" && odperiod!=null && doperiod!=null && zanrovi.length==0){
        console.log("radi odperiod i doperiod i izdavac")// db.test.find({ b : { $gt :  4, $lt : 6}});
        KnjigaModel.find({'izdavac':izdavac,'godina':{$gte:odperiod,$lt:doperiod},$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
      }
      
      if(izdavac!="" && odperiod!=null && doperiod!=null && zanrovi.length!=0){
        console.log("radi odperiod i doperiod i izdavac i zanrovi")// quantity: { $in: [ 5, 15 ] }
        
            
        KnjigaModel.find({'zanr':{$in:zanrovi},'izdavac':izdavac,'godina':{$gte:odperiod,$lt:doperiod},$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
    
      }
      if(izdavac!="" && odperiod==null && doperiod!=null && zanrovi.length!=0){
        console.log("radi doperiod i izdavac i zanrovi")// quantity: { $in: [ 5, 15 ] }
        
            
        KnjigaModel.find({'zanr':{$in:zanrovi},'izdavac':izdavac,'godina':{$lt:doperiod},$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
    
      }
      if(izdavac!="" && odperiod!=null && doperiod==null && zanrovi.length!=0){
        console.log("radi odperiod i izdavac i zanrovi")// quantity: { $in: [ 5, 15 ] }
        
            
        KnjigaModel.find({'zanr':{$in:zanrovi},'izdavac':izdavac,'godina':{$gte:odperiod},$or:[{'naziv':{$regex:parametar,$options:"$i"}},{'autor':{$regex:parametar,$options:"$i"}}]},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
    
      }
     }
     uvecajKolicinu=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        KnjigaModel.updateOne({'id':id},{$inc:{'kolicina':1}},(err)=>{
             if(err)console.log(err)
             else{
                console.log("incccccc")
             }
         })
     }
     umanjiKolicinu=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        KnjigaModel.updateOne({'id':id},{$inc:{'kolicina':-1}},(err)=>{
             if(err)console.log(err)
             else{
                res.json({"message":"ok"})
             }
         })
     }
     uvecajBrUzimanja=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        KnjigaModel.updateOne({'id':id},{$inc:{'bruzimanja':1}},(err)=>{
             if(err)console.log(err)
             else{
                res.json({"message":"ok"})
             }
         })
     }
     dohvKnjigu=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        KnjigaModel.findOne({'id':id},(err,knjiga)=>{
            if(err)console.log(err);
            else{
                res.json(knjiga)
            }
        })
    }
    dodajRecenziju=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;
        let ocena=req.body.ocena;
       
        let komentar=req.body.komentar;//{ $push: { "achieve": 95 } }
        KnjigaModel.updateOne({'id':id},{$push:{'recenzije':{$each:[{'korime':korime,'ocena':ocena,'komentar':komentar,'datumivreme':new Date()}],$sort:{'datumivreme':-1}}}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    } 
    obrisiRecenziju=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;
        
       //update({},{$pull:{"data":{"id":3}}},{multi:true}
        KnjigaModel.updateOne({'id':id},{$pull:{'recenzije':{'korime':korime}}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    } 
    

    
    zaduzenaOdStrane=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;$push:
        KnjigaModel.updateOne({'id':id},{$push:{zaduzenaOdStrane:{'korime':korime}}},(err)=>{
             if(err)console.log(err)
             else{
                res.json({"message":"ok"})
             }
         })
     }
     izbaciIzZaduzenaOdStrane=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;
        KnjigaModel.updateOne({'id':id},{$pull:{zaduzenaOdStrane:{'korime':korime}}},(err)=>{
             if(err)console.log(err)
             else{
                
                res.json({"message":"ok"})
             }
         })
     }
     obrisiKnjigu=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        
        KnjigaModel.deleteOne({'id':id},(err)=>{
             if(err)console.log(err)
             else{
               
                res.json({"message":"ok"})
             }
         })
     }
     dodajKnjigu=(req:express.Request,res:express.Response)=>{

        let max=0;
        KnjigaModel.find({},(err,vrati)=>{
            vrati.forEach(data=>{
                if(data.id>max){
                    max=data.id;

                }
            })

            let novaKnjiga=new KnjigaModel({
                id:max+1,
                naziv:req.body.naziv,
                autor:req.body.autor,
               zanr:req.body.zanr,
                izdavac:req.body.izdavac,
                godina:req.body.godina,
                jezik:req.body.jezik,
                slika:req.body.slika,
               
            })
            novaKnjiga.save((err,resp)=>{
                if(err)console.log(err)
                else res.json("ok")
            })
        })
    

    }
    promeniPolje=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let polje=req.body.polje;
        let novo=req.body.novo;
        
        if(polje=="naziv"){
        KnjigaModel.updateOne({'id': id}, {$set: {'naziv': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="autor"){
        KnjigaModel.updateOne({'id': id}, {$set: {'autor': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="zanr"){
        KnjigaModel.updateOne({'id': id}, {$set: {'zanr': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="izdavac"){
        KnjigaModel.updateOne({'id': id}, {$set: {'izdavac': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="godina"){
        KnjigaModel.updateOne({'id': id}, {$set: {'godina': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="jezik"){
        KnjigaModel.updateOne({'id': id}, {$set: {'jezik': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="slika"){
        KnjigaModel.updateOne({'id': id}, {$set: {'slika': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    if(polje=="kolicina"){
        KnjigaModel.updateOne({'id': id}, {$set: {'kolicina': novo}},(err)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"ok"})
                
            }
        })
    }
    }
    dodajRezervaciju=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;
        KnjigaModel.updateOne({'id':id},{$push:{rezervacije:{'korime':korime}}},(err)=>{
             if(err)console.log(err)
             else{
                res.json({"message":"ok"})
             }
         })
     }
     izbaciIzRezervacije=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let korime=req.body.korime;
        KnjigaModel.updateOne({'id':id},{$pull:{rezervacije:{'korime':korime}}},(err)=>{
             if(err)console.log(err)
             else{
                res.json({"message":"ok"})
             }
         })
     }
    }



  