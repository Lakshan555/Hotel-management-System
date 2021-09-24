const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({

    roomNo:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    noOfBeds:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    availability:{ 
        type: String,
        default: "Available",
        required:true
    },
    image:{
        type: String,
        
    }

}); 

module.exports = mongoose.model('Room',roomSchema);