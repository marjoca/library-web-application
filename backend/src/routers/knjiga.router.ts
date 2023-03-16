import express from "express";
import { KnjigaController } from "../controllers/knjiga.controller";


const knjigaRouter=express.Router();
knjigaRouter.route('/dohvSveKnjige').get(
    (req,res)=> new KnjigaController().dohvSveKnjige(req,res)
)
knjigaRouter.route('/pretraziKnjige').post(
    (req,res)=> new KnjigaController().pretraziKnjige(req,res)
)
knjigaRouter.route('/uvecajKolicinu').post(
    (req,res)=> new KnjigaController().uvecajKolicinu(req,res)
)
knjigaRouter.route('/umanjiKolicinu').post(
    (req,res)=> new KnjigaController().umanjiKolicinu(req,res)
)
knjigaRouter.route('/uvecajBrUzimanja').post(
    (req,res)=> new KnjigaController().uvecajBrUzimanja(req,res)
)
knjigaRouter.route('/dohvKnjigu').post(
    (req,res)=> new KnjigaController().dohvKnjigu(req,res)
)
knjigaRouter.route('/dodajRecenziju').post(
    (req,res)=> new KnjigaController().dodajRecenziju(req,res)
)
knjigaRouter.route('/obrisiRecenziju').post(
    (req,res)=> new KnjigaController().obrisiRecenziju(req,res)
)
knjigaRouter.route('/zaduzenaOdStrane').post(
    (req,res)=> new KnjigaController().zaduzenaOdStrane(req,res)
)
knjigaRouter.route('/izbaciIzZaduzenaOdStrane').post(
    (req,res)=> new KnjigaController().izbaciIzZaduzenaOdStrane(req,res)
)
knjigaRouter.route('/obrisiKnjigu').post(
    (req,res)=> new KnjigaController().obrisiKnjigu(req,res)
)
knjigaRouter.route('/dodajKnjigu').post(
    (req,res)=> new KnjigaController().dodajKnjigu(req,res)
)
knjigaRouter.route('/promeniPolje').post(
    (req,res)=> new KnjigaController().promeniPolje(req,res)
)
knjigaRouter.route('/dodajRezervaciju').post(
    (req,res)=> new KnjigaController().dodajRezervaciju(req,res)
)
knjigaRouter.route('/izbaciIzRezervacije').post(
    (req,res)=> new KnjigaController().izbaciIzRezervacije(req,res)
)
export default knjigaRouter