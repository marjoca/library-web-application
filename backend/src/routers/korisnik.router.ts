import express from "express";
import { KorisnikController } from "../controllers/korisnik.controller";

const korisnikRouter=express.Router();
korisnikRouter.route('/login').post(
    (req,res)=>new KorisnikController().login(req,res)
)
korisnikRouter.route('/registruj').post(
    (req,res)=>new KorisnikController().registruj(req,res)
)
korisnikRouter.route('/proveriUsername').post(
    (req,res)=>new KorisnikController().proveriUsername(req,res)
)
korisnikRouter.route('/proveriEmail').post(
    (req,res)=>new KorisnikController().proveriEmail(req,res)
)
korisnikRouter.route('/dohvKorisnika').post(
    (req,res)=>new KorisnikController().dohvKorisnika(req,res)
)
korisnikRouter.route('/vratiKnjigu').post(
    (req,res)=>new KorisnikController().vratiKnjigu(req,res)
)
korisnikRouter.route('/zaduziKnjigu').post(
    (req,res)=>new KorisnikController().zaduziKnjigu(req,res)
)
korisnikRouter.route('/upisiUIstoriju').post(
    (req,res)=>new KorisnikController().upisiUIstoriju(req,res)
)
korisnikRouter.route('/dohvKorisnike').get(
    (req,res)=>new KorisnikController().dohvKorisnike(req,res)
)
korisnikRouter.route('/obrisiKorisnika').post(
    (req,res)=>new KorisnikController().obrisiKorisnika(req,res)
)
korisnikRouter.route('/promeniPolje').post(
    (req,res)=>new KorisnikController().promeniPolje(req,res)
)
korisnikRouter.route('/produziRok').post(
    (req,res)=>new KorisnikController().produziRok(req,res)
)
korisnikRouter.route('/produzavaoJe').post(
    (req,res)=>new KorisnikController().produzavaoJe(req,res)
)
korisnikRouter.route('/promeniTip').post(
    (req,res)=>new KorisnikController().promeniTip(req,res)
)
korisnikRouter.route('/blockunblock').post(
    (req,res)=>new KorisnikController().blockunblock(req,res)
)
korisnikRouter.route('/odobreniPredlozi').post(
    (req,res)=>new KorisnikController().odobreniPredlozi(req,res)
)
korisnikRouter.route('/odobrenaRezervacija').post(
    (req,res)=>new KorisnikController().odobrenaRezervacija(req,res)
)
korisnikRouter.route('/skloniOdobrenaRezervacija').post(
    (req,res)=>new KorisnikController().skloniOdobrenaRezervacija(req,res)
)
export default korisnikRouter