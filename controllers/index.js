exports.homePage = function(req,res,next){
    res.render('index',{
        title: 'Home page'
    })
}