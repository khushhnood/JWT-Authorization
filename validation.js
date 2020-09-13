const joi =  require('@hapi/joi')



const registervalidate = data=>{
const schema = joi.object({
    name : joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6)
})
  return schema.validate(data);
 
}

const loginvalidate = data=>{
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(6)
    })
return   schema.validate(data);
    
}

module.exports.loginvalidate = loginvalidate;
module.exports.registervalidate = registervalidate;



