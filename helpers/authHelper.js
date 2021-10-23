const jwt = require('jsonwebtoken')
const{tokens} = require('../config/app').jwt
const {Token} = require('../models/Model')
const {v4: uuid} = require('uuid')

const generateAccessToken = (userId)=>{
    const payload={
        userId,
        type: tokens.access.type
    }
    const options = { expiresIn: tokens.access.expiresIn}
    return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,options)
}

const generateRefreshToken = ()=>{
    const payload={
        id: uuid(),
        type: tokens.refresh.type
    }
    const options = {expiresIn: tokens.refresh.expiresIn}
    return {
        tokenId: payload.id,
        token: jwt.sign(payload,process.env.JWT_ACCESS_SECRET,options)
    }
}


const updateRefreshToken = async(tokenId,userId)=>{
    const tokens = await Token.findOne({userId})
    if(tokens){
        Token.findOneAndRemove({userId}) 
        .then(()=> Token.create({tokenId,userId}))
    }
    else return
   
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    updateRefreshToken
} 