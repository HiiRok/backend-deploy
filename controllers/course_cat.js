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

const getAllCoursesCat = async (req,res)=>{

	try{
		const result = await courseCat.find({})

		res.status(200).json(result)
	}

	catch(error){
		console.log(error)
		res.status(500).json("Internal Server error")
	}
}

//getAllCoursesCat
//GetOneCourseCat
//updateCoursecat detail
//deleteCourseCat
//Add new course to a CourseCat

module.exports={AddCourseCat,getAllCoursesCat}
