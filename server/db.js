const mongoose = require('mongoose')


const dbconnect = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/todo");
        console.log("DB connect successfully!")
    }catch(err){
        console.log(err);
    }
} 

module.exports = dbconnect;