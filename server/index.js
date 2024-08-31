const express = require('express')
const cors = require('cors')
const dbconnect = require('./db')
const router = require('./router')
const dotenv = require('dotenv')

const app = express();
app.use(express.json());
dotenv.config();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) // Use this after the variable declaration


dbconnect();


app.use('/api', router);

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})