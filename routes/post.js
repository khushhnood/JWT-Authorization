const express = require('express')
const router = express.Router()
const webtoken = require('../models/mongo')
const verify = require('./verify')

router.get('/',verify,async(req,res)=>{
    try {
        const users = await webtoken.find({})
        res.render('post',{data:users})

    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router;