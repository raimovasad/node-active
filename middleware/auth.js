const jwt = require('jsonwebtoken')
const {User} = require('../models/Model')


module.exports = async function(req,res,next){

   try{
     const {access_token,refresh_token} = req.cookies
   if(!access_token){
     return  res.redirect('/api/auth')
   }
   const token = access_token.toString()
   const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
   if(payload.type !== 'access'){
     res.status(401).json({message:'Invalid Token!'})
     return
    }
   const session_user = await User.findById(payload.userId)
   req.user = session_user
   res.cookie('access_token', access_token)
   return next()
   }
   catch(e){
   if(e instanceof jwt.JsonWebTokenError){
    return res.status(401).json({success:false, message:e})
   }
   if(e instanceof jwt.TokenExpiredError){
    return res.status(401).json({success:false, message:"Token expired! Please relogin!"})
   }
   }
}  