const express =require('express')
const { admin, authAdmin, getAllUsers, deleteUser, getuser, updateUser } = require('../controllers/adminController')


const router=express.Router()

router.route('/').get(getAllUsers)
router.route('/').post(admin)
router.route("/deleteuser").delete(deleteUser)
router.route('/login').post(authAdmin)
router.route("/edituser/:userId").get(getuser)
router.route("/edituser/:userId").patch(updateUser)             


module.exports =router