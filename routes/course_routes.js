const express= require('express')

const router= express.Router();
const {AddCourseCat,getAllCoursesCat,addCourseToCat,DeleteCat}= require('../controllers/course_cat')
const {AddCourse,AddVideo,AllCourses,DeleteCourse,getOneCourse,addCourseToUser,getOneCourseByParam}= require('../controllers/course')

const Payment= require('../controllers/payment')
const CoursePayment = require('../controllers/PaymentNew')

router.route('/course_cat').post(AddCourseCat).get(getAllCoursesCat).delete(DeleteCat);
router.route('/course_cat_rel').post(addCourseToCat)
router.route('/courses').post(AddCourse).get(AllCourses).delete(DeleteCourse);
router.route('/courseOne').get(getOneCourse)
router.route('/:id').get(getOneCourseByParam)
router.route('/courses/video').put(AddVideo)
router.route('/userCourse').put(addCourseToUser);


router.route('/payment').post(CoursePayment)


module.exports=router
