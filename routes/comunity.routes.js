// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require('mongoose');

// Require Models
const User = require('../models/User.model');

// GET Route to display all the Idiotiles
router.get('/comunity', async(req,res)=>{
    try{
        let allUsers = await User.find().populate();
        res.json(allUsers);
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 



