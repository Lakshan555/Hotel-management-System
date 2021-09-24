const express = require('express');
const Customer = require('../models/customer'); //import user model

const router = express.Router(); //send http request

//crate customer 
router.post('/customer/add',(req,res)=>{

    let newCustomer = new Customer(req.body);

    newCustomer.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Customer created Successfully!"
        });

        });
});

//get customer
router.get('/customer',(req,res)=>{
    Customer.find().exec((err,cus)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingCustomer: cus
        });
    }) ;          
});


//get specic post
router.get("/customer/:id",(req,res)=>{
    let eId = req.params.id;
    Customer.findById(eId,(err,customer)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            customer
        });
    });
});


//update customer
router.put('/customer/update/:id',(req,res)=>{
    Customer.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,customer)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            })
        }
    );
});

//delete customer

router.delete('/customer/delete/:id',(req,res)=>{
    Customer.findByIdAndRemove(req.params.id).exec((err,deletedCustomer)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deletedCustomer
        });

    });
});




module.exports = router;


