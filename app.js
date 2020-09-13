const express = require('express')
const app = express();
const token = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyparser  = require('body-parser');
const path = require('path')
const dotenv = require('dotenv')
const webtoken  = require('./models/mongo')
const {registervalidate,loginvalidate } = require('./validation');
const router = require('./routes/user')
const postroutes = require('./routes/post')
const testroute = require('./routes/test')
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');



dotenv.config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static('public'))

app.use('/user',router);
app.use('/post',postroutes)
app.use('/test',testroute)


app.get('/',(req,res)=>{
    
    res.redirect('/user')
})

app.listen(3000,()=>{
    console.log(`server running on 3000`)
})