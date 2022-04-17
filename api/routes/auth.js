const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); // used to encrypt password

// REGISTER
router.post("/register", async (req,res)=>{ // had this as get before
    /*
    const user = new User({
        username: "darshana",
        email: "venkat82@purdue.edu",
        password: "password123"
    })

    user.save();
    res.send("ok");*/

    try{
        // generating new password (encrypted)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user and respond
        const existingUser = await User.findOne({username:req.body.username}); // username with that email already exists

        if(!existingUser /*&& (!newUser.email.equals("topic"))*/){
            const existingUser2 = await User.findOne({email:req.body.email}); 
            if(!existingUser2){
                const user = await newUser.save();
                return res.status(200).json(user); // send success (200)
            }
           
        }else{
            return res.status(404).json("username or email already taken!"); // if user not found send error message
        }
        
    }catch(err){
        //console.log(err);
        return res.status(500).json(err);
    }
   
})

// end of register

//search
router.post("/search", async (req,res)=>{
    try{
        // find user with same email
        const user = await User.findOne({username:req.body.username});
        if(!user){
            return res.status(404).json("user not found."); // if user not found send error message
        }
        
        // if valid email and password,, send success
        return res.status(200).json(user);

    }catch(err){
       // console.log(err);
       return res.status(500).json(err);
    }
    
    
}); 


router.post("/login", async (req,res)=>{
    try{
        // find user with same email
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json("user not found."); // if user not found send error message
        }

        // check if correct password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json("password is incorrect");  // if passwords do not match send error message
        }
        
        // if valid email and password,, send success
        return res.status(200).json(user);

    }catch(err){
       // console.log(err);
       return res.status(500).json(err);
    }
    
    
}); 



module.exports = router