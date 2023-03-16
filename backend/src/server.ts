import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routers/korisnik.router';
import knjigaRouter from './routers/knjiga.router';


const app = express();
const bodyParser=require("body-parser");
const multer=require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../frontend/app/src/assets/profilneslike')
    },
    filename:(req,file,cb)=>{
        
        cb(null,file.originalname);
    }
});
const upload=multer({
    storage:storage
})
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// uspostavljamo konekciju sa bazom
mongoose.connect('mongodb://localhost:27017/baza22')
const connection=mongoose.connection
connection.once('open',()=>{
    console.log('opened db connection')
})
const router=express.Router();


router.use('/korisnik',korisnikRouter);
router.use('/knjige',knjigaRouter);
router.route('/file').post(upload.single('image'),(req,res)=>{
    
    /*const file=req.body.file
    if(!file)console.log("nofileee")
    res.send(file)*/
    console.log("hvataaa")

})


app.use('/',router);


app.listen(4000, () => console.log(`Express server running on port 4000`));