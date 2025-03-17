const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//register
router.post("/register", async(req, res)=>{
    try{
        const {userName, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({userName, password: hashedPassword});
        await newUser.save();
        res.status(200).json({message:"User Registration successful"});
    }catch(err){
        res.status(400).json({message:"Registration Failed"});
    };
})

//post
router.post("/login", async(req,res)=>{
    try{
        const {userName, password} = req.body;
        const user = await User.findOne(userName);
        if(!user) return res.status(404).json({message:"User not found"});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(500).json({message:"Password Wrong"});
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(200).json({token});
    }catch(err){
        res.status(400).json({message:"Failed to login"});
    };
})

module.exports = router;