const express= require('express')

const router= express.Router();
const {AddCourseCat}= require('../controllers/course_cat')

router.route('/course_cat').post(AddCourseCat);

module.exports=router
