const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
app.use(cors());
const {PORT, DBUSERNAME, DBPASSWORD} = process.env;
const db_url = `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@cluster0.ckq7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 
mongoose.connect(db_url).then(function(Connection){
    console.log("Connection")
}).catch(err => console.log(err.message))
 

const UserContactDetailsSchemaRules = {
    name: {
        type:String,
        required: true
    },
    phone: {
        type:Number,
        required:true
    },
    btype:{
        type:String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}

const UserContactDetailsSchema = new mongoose.Schema(UserContactDetailsSchemaRules);

const UserContactDetailsModel = mongoose.model("UserContactDetailsModel", UserContactDetailsSchema);

app.use(express.json())
app.use(function(req, res, next){
    if(req.method === "POST"){
        const userDetails = req.body;
        const isempty = Object.keys(userDetails).length == 0;
        if(isempty){
            res.status(404).json({
                status: "failure",
                message: err.message
            })
        }else{
            next()
        }
    }else{
        next()
    }
})

app.post("/api/contact", function(req, res){
    try{
        const userDetails = req.body;
        const user = UserContactDetailsModel.create(userDetails);
        res.status(200).json({
            status : "success",
            message: 'message',
            user,
        })
    } catch(err){
        res.status(404).json({
            status: "failure",
            message: err.message
        }) 
    }
})

app.get("/api/contact", function(req, res){
    try{
        const userDetails = UserContactDetailsModel.find();
        if(userDetails.length == 0){
            throw new error("errrr")
        }else{
            res.status(200).json({
                status: 'success',
                message: userDetails
            })
        }
    }catch(err){
        res.status(404).json({
            status: 'failure',
            message: err.message
        })
    }
})

app.listen(PORT, function(){
    console.log("its a console")
})