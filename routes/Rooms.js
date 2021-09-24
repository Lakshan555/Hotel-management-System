const express = require('express');
const Room = require('../models/room'); //import user model

const router = express.Router(); //send http request

//crate room 
router.post('/room/add',(req,res)=>{

    let newRoom = new Room(req.body);

    newRoom.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Room created Successfully!"
        });

        });
});

//get room
router.get('/room',(req,res)=>{
    Room.find().exec((err,events)=>{
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
router.get("/room/:id",(req,res)=>{
    let eId = req.params.id;
    Room.findById(eId,(err,room)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            room
        });
    });
});


//update room
router.put('/room/update/:id',(req,res)=>{
    Room.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,room)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            })
        }
    );
});

//delete room

router.delete('/room/delete/:id',(req,res)=>{
    Room.findByIdAndRemove(req.params.id).exec((err,deletedEvent)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deletedEvent
        });

    });
});




module.exports = router;


