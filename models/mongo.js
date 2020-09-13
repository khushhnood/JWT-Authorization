const mongooose = require('mongoose')
const schema = mongooose.Schema;
const dotenv = require('dotenv')
dotenv.config();
mongooose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("monngo connected")
    }
})

var jwt = new schema({
    name:{
        type: String,
        max:255,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default: Date.now
    }
},{collection:'webtoken'})



var jsonweb = mongooose.model('webtoken',jwt)



module.exports = jsonweb;