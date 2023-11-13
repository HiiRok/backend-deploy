const express= require('express')

const router= express.Router();
const {AddCourseCat,getAllCoursesCat}= require('../controllers/course_cat')
const {AddCourse,AddVideo,AllCourses}= require('../controllers/course')

router.route('/course_cat').post(AddCourseCat).get(getAllCoursesCat);
router.route('/courses').post(AddCourse).get(AllCourses);
router.route('/courses/video').put(AddVideo)



module.exports=router
