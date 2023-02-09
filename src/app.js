const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const bcrypt =require("bcryptjs");
require("./db/conn");
const Audience=require("./models/response");
const Register_user=require("./models/register");

const port=process.env.PORT||3000;


// this is the most importat part to use files inside the static folder
const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path));

// ****************************************************

const view_path=path.join(__dirname,"../views");
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(view_path));
app.set("view engine","hbs");
app.set("views",template_path);//now my views folder become template so go to root template and check there 
hbs.registerPartials(partial_path);
app.get("/",(req,res)=>{
    res.render("index");//index page
})
app.get("/index",(req,res)=>{
    res.render("index");//index page
})
app.get("/login",(req,res)=>{
    res.render("login");//login page
})

app.get("/register",(req,res)=>{
    res.render("register");//register page
})

console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email}  and password is ${password}`)
        const checkdata = await Register_user.findOne({email:email});


        const ismatch = await bcrypt.compare(password,checkdata.password);
        if(ismatch){
            res.status(201).render("index");
            console.log(checkdata);
        }
        else{
            res.send("Invalid Login details!");
        }
        
        // const dbpass=checkdata.password;

       
    }catch(e){  
        res.status(404).send(e);
    }
})
app.post("/register",async(req,res)=>{
    try{
            const pass=req.body.password;
            const r_pass=req.body.confirm_pass;
            if(pass===r_pass){
                const user= new Register_user({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    confirm_pass:req.body.confirm_pass
                })

                //hash password
                //middleware

                    const saveuser=await user.save();
                    res.status(201).render("index");
            }
            else {
                res.send("passwords are not matching!");
            }
                  
        
    }catch(e){
        res.status(404).send(e);
    }
})


app.post("/contact",async(req,res)=>{
          
          try{   
          const data= new Audience({
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            message:req.body.message
          })
         const saveresponse= await data.save();
         res.status(201).render("index");
    }catch(e){
        res.status(404).send(e);

    }
})


app.get("/",(req,res)=>{
    res.send("hello from admin");
})




// const bcryptjs=require("bcryptjs");

// const hashfunction= async(pass)=>{
//     const hashconvert= await bcryptjs.hash(pass,10);
//     console.log(hashconvert);

//     const checkpass= await bcryptjs.compare(pass,hashconvert);
//     console.log(checkpass);

// }
// hashfunction("Rohit@123");

app.listen(port,()=>{
    console.log(`connection is establish at ${port}`);
})