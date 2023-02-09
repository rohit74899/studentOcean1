const mongoose=require("mongoose");
// const validator=require("validator");
const bcrypt = require("bcryptjs");
const user= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        // unique:true,
        unique:true
        // validator(val){
        //     if(!validator.isEmail(val)){
        //         throw new Error("Invalid Email");
        //     }
        // }

    },
    password:{
        type:String,
        require:true
        
    
    },
    confirm_pass:{
        type:String,
        require:true

    }
})

//pre method calls the hash to convert password to the hasing value
// pre means before the given method first perform the given task
user.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`the current password if ${this.password}`);
        this.password= await bcrypt.hash(this.password,10);
        console.log(`the updated password if ${this.password}`);

        this.confirm_pass=undefined;
    }
    
    next();
} )



// we create a collection
Register_user =mongoose.model("Register_user",user);

module.exports=Register_user;