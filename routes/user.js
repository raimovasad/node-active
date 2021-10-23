const Router = require('express').Router
const router = Router()
const {profilePage,editProfileGet,editProfilePost,deleteProfile} = require('../controllers/user')
const fileMiddleware = require('../middleware/fileMiddleware')

router.route('/').get(profilePage)
router.route('/edit').get(editProfileGet)
router.route('/delete').get(deleteProfile)
router.route('/edit').post(fileMiddleware.single('avatar'),editProfilePost)


module.exports = router