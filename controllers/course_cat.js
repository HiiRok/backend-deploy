const courseCat=require('../models/course_cat')
const Courses= require('../models/courses')
const CatCourseRel= require('../models/cat_course_rel')

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

const addCourseToCat = async (req,res)=> {

	try{
		const Cat= await courseCat.findOne({_id:req.body.id})
		if(!Cat){
			res.status(404).json("Category not found")
			return
		}


		else 
		{
			const course= await Courses.findOne({_id: req.body.courseId})

			if(!course){
				res.status(404).json("Course not found")
				return
			}

			else{
				
				const result = await CatCourseRel.create({catId: Cat._id, courseId: course._id})
				res.status(200).json({msg:"Course added to Category", modified: result.modifiedCount})
			}

		}
	}
	catch(error){
		console.log(error)
		res.status(500).json("Internal server Error")
	}

}

//GetOneCourseCat
//updateCoursecat detail
//deleteCourseCat
//Add new course to a CourseCat

module.exports={AddCourseCat,getAllCoursesCat,addCourseToCat}
