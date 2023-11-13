const express= require('express')

const router= express.Router();
const {AddCourseCat}= require('../controllers/course_cat')
const {AddCourse,AddVideo}= require('../controllers/course')

router.route('/course_cat').post(AddCourseCat);
router.route('/courses').post(AddCourse);
router.route('/courses/video').put(AddVideo)


module.exports=router
