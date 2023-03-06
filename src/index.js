import express, { json } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import dbConnect from './db.js'
import bodyParser from "body-parser";
import routerUser from './routes/user.js'
dotenv.config();


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/', routerUser)


const port = process.env.PORT || 3000
app.listen(port, () => 
    console.log(`listening on port ${port}`)
)
dbConnect();