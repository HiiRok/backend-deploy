const courseCat=require('../models/course_cat')

const AddCourseCat= async (req,res)=>{

	try {
		const newCat= await courseCat.create(req.body)
		res.status(201).json(newCat)

	}
	catch(error){
		console.log(error)

		res.status(501).json("Course Cat failed to be created")
	}
}

//getAllCoursesCat
//GetOneCourseCat
//updateCoursecat detail
//deleteCourseCat
//Add new course to a CourseCat

module.exports={AddCourseCat}
