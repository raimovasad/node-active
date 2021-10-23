const Router = require('express').Router
const router = Router()
const fileMiddleware = require('../middleware/fileMiddleware')
const {getAllBlogs,addBlogGet,addBlogPost,blogView,deleteBlog,editBlogGet,editBlogPost,getAll} = require('../controllers/blogs')

router.route('/').get(getAllBlogs)
router.route('/getAll').get(getAll)
router.route('/view/:id').get(blogView)
router.route('/delete/:id').get(deleteBlog)
router.route('/edit/:id').get(editBlogGet)
router.route('/edit').post(fileMiddleware.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),editBlogPost)
router.route('/add').get(addBlogGet)
router.route('/add').post(fileMiddleware.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addBlogPost)


module.exports = router