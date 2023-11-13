const express= require('express')

const router= express.Router();
const {AddCourseCat}= require('../controllers/course_cat')
const {AddCourse,AddVideo,AllCourses}= require('../controllers/course')

router.route('/course_cat').post(AddCourseCat);
router.route('/courses').post(AddCourse).get(AllCourses);
router.route('/courses/video').put(AddVideo)


module.exports=router
