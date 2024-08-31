const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
    }
},{ timestamps: true });

const Notes = mongoose.model("notes", todoSchema);
module.exports = Notes;