const express =require('express')
const { admin, authAdmin } = require('../controllers/adminController')


const router=express.Router()

router.route('/').post(admin)
router.route('/login').post(authAdmin)

module.exports =router