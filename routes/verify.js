
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const verifyMiddleware = async (req,res,next)=>{
    
    const token  = req.cookies['authToken'];

    if(!token) return res.send("access denied")
    
    
    try {
        const verify = await jwt.verify(token,process.env.TOKEN_KEY)
    if(verify) {
        res.user = verify
        next()
    }else{
        res.send("not valid token")
    }
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = verifyMiddleware;