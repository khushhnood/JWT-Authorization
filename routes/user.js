const express = require('express')
const router = express.Router()
const {registervalidate,loginvalidate } = require('../validation');
const webtoken  = require('../models/mongo')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const cookie = require('cookie-parser');



router.get('/login',(req,res)=>{
     res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/login', async(req,res)=>{
    //Validation
    const {error} = loginvalidate(req.body)
    if(error){
        console.log(error.details[0].message);
        return res.send(error.details[0].message);
        }
        
    const user  = await webtoken.findOne({email:req.body.email});
    if(!user) return res.send("email not found")

    const pass = await bcrypt.compare(req.body.password,user.password)
    if(!pass) return res.send("invalid pass")

    const token = await jwt.sign({_id:user._id},process.env.TOKEN_KEY);
    console.log(token)
    if(token){
        res.cookie("authToken",token,{httpOnly:true})
        res.redirect('/post')
    }

    
})

router.post('/register',async (req,res)=>{
     //Validation
     const {error} = registervalidate(req.body)
     if(error){
         console.log(error.details[0].message);
         return res.send(error.details[0].message);
         
     } 
 
 //checking email
       
        const emailExist = await webtoken.findOne({email:req.body.email});
        if(emailExist) return res.send("email exists")
         
             const salt =  await bcrypt.genSalt(11)
             const hashedpassword = await bcrypt.hash(req.body.password,salt);
              
         var user = webtoken({
             name: req.body.name,
             email : req.body.email,
             password : hashedpassword
         })

         
         
        
      
         try {
             await user.save(()=>(console.log("user added")))
            
             res.redirect('/user/login')

         } catch (error) {
             console.log(error)
         }
})

router.get('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    const deleted  = await webtoken.findByIdAndRemove({_id:id},{useFindAndModify:false})
    if(deleted){
        console.log("deleted")
     
        res.redirect('/post')
    }else{
        console.log("error in delete")
    }
})

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/logout',(req,res)=>{
    res.clearCookie('authToken',{httpOnly:true})
    res.redirect('/user')
})
module.exports = router;