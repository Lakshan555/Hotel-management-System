const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({

    customerId:{
        type: String,
        required:true
    },
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    phoneNo:{
        type: Number,
        required:true
    },
    email:{
        type: String,
        required:true
    }
    

}); 

module.exports = mongoose.model('Customer',customerSchema);