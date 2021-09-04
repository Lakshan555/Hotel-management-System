const express = require('express');
const Event = require('../models/event'); //import user model

const router = express.Router(); //send http request

//crate event 
router.post('/event/add',(req,res)=>{

    let newEvent = new Event(req.body);

    newEvent.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Event created Successfully!"
        });

        });
});

//get event
router.get('/event',(req,res)=>{
    Event.find().exec((err,events)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEvent: events
        });
    }) ;          
});


//get specic post
router.get("/event/:id",(req,res)=>{
    let eId = req.params.id;
    Event.findById(eId,(err,event)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            event
        });
    });
});


//update event
router.put('/event/update/:id',(req,res)=>{
    Event.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,event)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            })
        }
    );
});

//delete event

router.delete('/event/delete/:id',(req,res)=>{
    Event.findByIdAndRemove(req.params.id).exec((err,deletedEvent)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deletedEvent
        });

    });
});




module.exports = router;


