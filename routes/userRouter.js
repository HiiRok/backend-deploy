const express= require('express')
const router= express.Router();
const register= require('../controllers/register')
const login= require('../controllers/login')
const {forgotPassword, resetPassword}= require('../controllers/password')


router.route('/register/v1').post(register)

router.route('/login').post(login)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

module.exports=router;
