const {User,Blog} = require('../models/Model')
const toDelete = require('../helpers/toDeleteFile')


exports.getAllBlogs = async(req,res,next)=>{
    const user = await User.findById(req.user._id)
  await  user.accessTokenAuth(req,res)
    const blogs = await Blog.find()
            res.render('blogs',{
                title: 'All blogs',
                blogs
            })
        
}

exports.getAll = async(req,res,next)=>{
            const blogs = await Blog.find()
            res.status(200).json({blogs:blogs,user:res.locals.userAdmin})
}

exports.addBlogGet = async(req,res,next)=>{
            
            res.render('add-blog',{
                title: 'Add your blog'
            })
        
}

exports.blogView = async(req,res,next)=>{
      const blog = await Blog.findById(req.params.id)

    res.render('blog-view',{
        title: 'Add your blog',
        blog
     }) 
        
}

exports.deleteBlog = async(req,res,next)=>{
   const blog= await Blog.findById(req.params.id)
  if(res.locals.userAdmin._id.toString() === blog.userId.toString()){
    toDelete(blog.image)
    toDelete(blog.audio)
    try{
       await Blog.findByIdAndRemove(req.params.id)
     return  res.redirect('/blogs') 
    }
    catch(e){
        console.log(e);
    }
  }
  else{
      return res.redirect('/blogs')
  }

    
        
}

exports.editBlogGet = async(req,res,next)=>{
     try{
        const blog =  await Blog.findById(req.params.id)
        res.render('edit-blog',{
            title: `Edit ${blog.title}`,
            blog
        })
     }
     catch(e){
         console.log(e);
     }

    
        
}
exports.editBlogPost = async(req,res,next)=>{
    const blog = await Blog.findById(req.body.id)
    const {title,info,videoUrl} =  req.body
     try{
         let image,audio;
        if( req.files.length ){
            image=req.files.image[0].filename;
            audio=req.files.audio[0].filename;
        }
        else{
            image = blog.image
            audio = blog.audio
        }
        
         const newBlog = {
            title,
            info,
            videoUrl,
            image,
            audio,
            date: Date.now()
         }
        await Blog.findByIdAndUpdate(blog._id, newBlog)
        res.redirect('/blogs') 
     }
     catch(e){
         console.log(e);
     }

    
        
}

exports.addBlogPost = async(req,res,next)=>{
    console.log(req.files);
     let {title,info,videoUrl} = req.body
     if(!videoUrl || videoUrl.trim()==''){
        videoUrl = ''
     }
     const image = req.files.image[0].filename
     const audio = req.files.audio[0].filename
     console.log('image', req.files.image[0]);
     try {
    await  Blog.create({
        title,
        info, 
        image,
        videoUrl,
        audio,
        userId: res.locals.userAdmin._id
    })

        
    res.redirect("/blogs");

 } catch (e) {
      console.log(e);
}
        
}