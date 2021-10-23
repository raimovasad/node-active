const Router = require('express').Router
const router = Router()
const fileMiddleware = require('../middleware/fileMiddleware')

const {register,login,authPage,logout} = require('../controllers/auth')


router.route('/').get(authPage)
router.route('/register').post(fileMiddleware.single('avatar'),register)
router.route('/login').post(login)
router.route('/logout').get(logout)




module.exports = router