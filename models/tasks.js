const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    lastdate:{
        type:Date,
        required:true
    }
    },{
        timestamps:true
    });

    const tasks=mongoose.model('tasks',taskSchema);
    module.exports=tasks;