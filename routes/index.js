const Router = require('express').Router
const router = Router()
const {homePage} = require('../controllers/index')

router.route('/').get(homePage)


module.exports = router