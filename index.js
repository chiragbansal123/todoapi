const express=require('express');
const app=express();
const db=require('./mongoose');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',require('./routes'));
const PORT=8000;
app.listen(PORT,function(req,res){
    console.log("Server is running");
})