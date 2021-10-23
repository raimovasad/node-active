const {model,Schema} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        minlength:3
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
        match:[/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
        minlength:6,
        select:false
    },
    avatar: String


})




const blogSchema = new Schema({
    title: {
        type: String,
        required:[true,'Please enter the title of the blog']
    },
    image:{
        type:String,
    },
    info:{
        type: String,
    },
    videoUrl:{
        type:String,
        default:''
    },
    audio:{
        type:String,
        default:''
    },
    userId:{
        type:Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date:{
        type: Date,
        default: Date.now()
    }

})


const tokenSchema = new Schema({
    tokenId:String,
    userId: String
})



userSchema.pre('save',async function(next){
if(!this.isModified("password")){
    next()
}

const salt =await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt)
next()
})


userSchema.methods.matchPasswords= async function(password){
        return await bcrypt.compare(password,this.password)
    }
    

userSchema.method('accessTokenAuth',function(req,res){
    const {access_token} = req.cookies
    res.cookie('access_token', access_token.toString())
}) 
module.exports = {
    Blog:  model("Blog",blogSchema),
    User:model("User",userSchema),
    Token:model("Token",tokenSchema)
}