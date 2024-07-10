const express= require('express')
const router= express.Router();
// const register= require('../controllers/register')
const {checkCoursePurchased}= require('../controllers/course')


router.route('/:id').get(checkCoursePurchased)

// router.route('/login').post(login)

module.exports=router;
