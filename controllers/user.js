const {User} = require('../models/Model')
const toDelete = require('../helpers/toDeleteFile')
const bcrypt = require('bcryptjs')

exports.profilePage = async(req,res,next)=>{
         const user = req.user
            res.render('user',{
                title: 'Home page',
                user
            })
        
}
exports.deleteProfile = async(req,res,next)=>{
    toDelete(res.locals.userAdmin.avatar)
    await User.findByIdAndRemove(res.locals.userAdmin._id)
        res.redirect('/api/auth/logout')
}
exports.editProfileGet = async(req,res,next)=>{
         const user = req.user
            res.render('edit-user',{
                title: `Edit ${user.username}`,
                user
            })
        
}
exports.editProfilePost = async(req,res,next)=>{
         const currentUser = await User.findById(res.locals.userAdmin._id) 

         const {username,email,password,password2} = req.body
    req.file ? avatar =req.file.filename : avatar=currentUser.avatar;
    if(password && password2){

    const isSame = password== password2
    const hash = await bcrypt.hash(password,12)
        try{
            if(!isSame){
                return res.json({success:false, message:'Passwords don\'t match!'})
            }
            
            const newUser = {
                username,
                email,
                password:hash,
                avatar
            }
            const user = Object.assign(currentUser,newUser)
                
            await User.findByIdAndUpdate(user._id, newUser)
           
            res.redirect('/')
            
            // .status(201).json({success:true,message:'User has been created'})
        }catch(e){
            next(e)
        }
    }
    else{
        const newUser = {
            username,
            email,
            avatar
        }
        await User.findByIdAndUpdate(currentUser._id, newUser)
        res.redirect('/')

    }


        
}