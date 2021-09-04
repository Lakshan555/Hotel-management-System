const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({

    Bid:{
        type: String,
        required: true
    },
    Gname : {
        type : String,
        required : true // this is back end validation 
    },
    Bname : {
        type : String,
        required : true
    },
    wDate : {
        type: Date,
		default: Date.now()
    },
    hType : {
        type: String,
        required : true
    },
    guest: {
        type: Number,
        required : true
    },
    cost: {
        type: Number,
        required : true
    }, 
    total: {
        type: Number,
        required : true
    }, 
    


})

module.exports = mongoose.model('Event',eventSchema);