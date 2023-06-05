const express = require("express");
const router = express.Router();

// GET Route to display Notification
router.get('/check', async(req,res)=>{
    try{
        let check = res.json(checkout);
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 


