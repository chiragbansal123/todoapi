
const { default: mongoose } = require('mongoose');
const tasks=require('../models/tasks');

module.exports.create=async function(req,res){
    try{
        let task=await tasks.create(req.body);
        return res.status(200).json({
            message:"Task has been created",
            data:task
        });
    }
    catch(error){
        return res.status(400).error(error)
    }

}

module.exports.fetch=async function(req,res){
    try{
        const page=req.query.page;
        console.log(page);
        const LIMIT = 3;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total=await tasks.countDocuments({});
        console.log(startIndex+" "+total);
        if(startIndex>total){
            return res.status(404).json({
                message:"no more tasks available"
            }) 
        };
        const task = await tasks.find().sort({"createdAt": 1}).limit(LIMIT).skip(startIndex);
        return res.status(200).json({
            message:"task fetched successfully",
            data:task
        });
    }
    catch(err){
        return res.status(400).send(err)
    }
}
module.exports.delete=async function(req,res){
    try{
        let task=await tasks.deleteOne(req.params.id);
        if(task){
            return res.status(200).json({
                message:"task deleted successfully"
            })
        }
    }
    catch(err){
        return res.status(404).send("There is no task with this id");
    }
}
module.exports.update=async function(req,res){
    try{
        if(!(mongoose.Types.ObjectId.isValid() && tasks.findById(req.params.id))){
            return res.status(404).json({
                message:"No task present with this id"
            })
        }        
        let task= await tasks.findByIdAndUpdate(req.params.id.substring(1),req.body);
        if(task){
            return res.status(201).json({
                message:"The task is updated",
                data:task
            });
        }
        else{
            return res.status(404).json({
                message:"No task present with this id"
            })
        }
    }
    catch(err){
        return res.status(400).send(err)
    }
}