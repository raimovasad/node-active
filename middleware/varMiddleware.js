const jwt = require('jsonwebtoken')
const {User} = require('../models/Model')
module.exports = async function(req,res,next){
  const {access_token,refresh_token} = req.cookies
  if(access_token){
    try{
          const token = access_token.toString()
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const session_user = await User.findById(payload.userId)
        res.locals.userAdmin = session_user
        return   next()
        }
        catch(error){
          
           if(error instanceof jwt.TokenExpiredError){
            return res.status(401).redirect('/api/auth')
           }
           if(error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({success:false, message:error})
           }
           return res.redirect('/api/auth')
        }
       
    }
   
  return  res.redirect('/api/auth')
}