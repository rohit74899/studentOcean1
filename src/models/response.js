const mongoose=require("mongoose");
const validator=require("validator");

const visitSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        
        validator(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email");
            }
        }

    },
    subject:{
        type:String,
        require:true,
        minlength:10
    },
    message:{
        type:String,
        require:true,

    }
})

const Audience =mongoose.model("Audience",visitSchema);

module.exports=Audience;