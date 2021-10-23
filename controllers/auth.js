const {User} = require('../models/Model')
const jwt = require('jsonwebtoken')
const authHelper = require('../helpers/authHelper')
const {Token} = require('../models/Model')
const bcrypt = require('bcryptjs')
const {v4:uuid} = require('uuid')


const updateTokens = async(userId)=>{
    const accessToken = authHelper.generateAccessToken(userId)
    const refreshToken = authHelper.generateRefreshToken()
    return authHelper.updateRefreshToken(refreshToken.tokenId,userId)
    .then(()=>({
        accessToken,
        refreshToken:refreshToken.token
    }))
}


exports.authPage = (req,res,next)=>{
    res.render('auth/auth',{
        title:'Authentication',
        layout:'empty'
    })
}


exports.register = async(req,res,next)=>{
    
    const {username,email,password,password2} = req.body
    req.file ? avatar =req.file.filename : avatar='';

    const candidate = await User.findOne({email:email})
    if(candidate){
        return res.status(400).json({success:false,message:"Email has already been registered"})
    }
    const isSame = password== password2
    console.log(isSame);
        try{
            if(!isSame){
                return res.redirect('/api/auth#register')
            }
            const user = new User({
                username,
                email,
                password,
                avatar
            })
                
            await user.save()
           
            res.redirect('/api/auth#login')
            
            // .status(201).json({success:true,message:'User has been created'})
        }catch(e){
            next(e)
        }
}
exports.login = async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.redirect('/api/auth')
        // .json({success:false,message:"Email or password has not been provided"})
    }
    try{

        const user = await User.findOne({email:email}).select('+password')
        if(!user){
            return res.redirect('/api/auth')
            // .status(404).json({success:false,message:'User has not been found'})
        }
        const isMatch = await  bcrypt.compare(password,user.password)
        console.log(isMatch);
        if(!isMatch){
            return res.redirect('/api/auth#login')
            // .status(401).json({success:false,message:"Invalid credentials"})
        }
        updateTokens(user._id).then(tokens => {
         res.cookie('access_token',tokens.accessToken)
         res.cookie('refresh_token',tokens.refreshToken)
         
        res.redirect('/blogs')   
        })  

    }catch(err){
        res.status(500).json({success:false, error: err.message})
    }
 

}
exports.logout = async(req,res,next)=>{
   
    try{

        res.clearCookie('access_token')
         
        res.redirect('/api/auth')   

    }catch(err){
        res.status(500).json({success:false, error: err.message})
    }


}

// const sendToken = async(user,statusCode,res)=>{
//     const access_token = await user.getSignedToken()
//     console.log(access_token);
//     res.status(statusCode).json({success: true,access_token})
// }

 exports.refreshTokens = (req,res)=>{
    const {refreshToken} = req.body;
    let payload;
    try{
        payload = jwt.verify(refreshToken,process.env.JWT_ACCESS_SECRET)
        
        if(payload.type !== 'refresh'){
            res.status(400).json({message: 'Invalid token!'})
            return
        }
    }
    catch(e){
        if(e instanceof jwt.TokenExpiredError){
            res.status(400).json({message:'Token expired!'})
            return
        }else if( e instanceof jwt.JsonWebTokenError){
           res.status(400).json({message:'Invalid token!'}) 
           return
        }
    }

    Token.findOne({tokenId: payload.id }) 
    .exec()
    .then((token)=>{
        if(token === null){
            throw new Error('Invalid token!')
        }
        return updateTokens(token.userId)
    })
    .then(tokens => res.json(tokens))
    .catch(err => res.status(500).json({message: err.message}))
}

 