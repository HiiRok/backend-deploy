const Courses= require('../models/courses')
const CatCourseRel= require('../models/cat_course_rel')
const trendCourses= require('../models/trend_courses')

const AddCourse= async (req,res)=> {

	const newCourse={
		Name: req.body.Name,
		Brief_Desc: req.body.description,
		Price: req.body.price,
		Author: req.body.Author,
		Objectives: req.body.objectives,
		ImgPath: req.body.ImgPath,
	}

	try {
		
		const course= await Courses.create(newCourse)

		console.log(course);

		res.status(201).json({newCourse: course, msg:"New Course Successfully added"})
	}

	catch(error){
		console.log(error)
		res.status(501).json("Failed to add new Course")
	}
}

const AddVideo=async (req,res)=>{
	

	try{
		const course= await Courses.findOne({_id:req.body.id})
		

		if(!course){
			res.status(404).json("Course not found")
		}

		else
		{
			let videoArray= course.Content;

			videoArray.push(req.body.video_id)


			const result= await Courses.updateOne({_id:course._id},{Content:videoArray})
			
			res.status(200).json({msg:"update Successful", modified: result.modifiedCount})
		}
	}

	catch(error){
		
		console.log(error)
		res.status(500).json("Internal server error")
	}
}


const AllCourses= async (req,res)=>{
	
	try{

		console.log("Inside All Courses")
		const result= await Courses.find({});	

		res.status(200).json(result)
	}

	catch(error){
		console.log(error)
		res.status(500).json("Internal Server error")
	}

}



const DeleteCourse= async (req,res)=>{
	try{
		
		await Courses.deleteOne({_id: req.body.id})
		let result = await CatCourseRel.deleteMany({courseId: req.body.id})
		result = await trendCourses.deleteOne({courseId: req.body.id})

		res.status(200).json({msg:"Count of Category Course Relation ",Count:result.deletedCount})
	}
	catch(error){
		console.log(error)
		res.status(500).json("Internal Server Error")
	}
}


//need id of the course
const getOneCourse= async (req,res)=>{
	
	try{
		const course= await Courses.findOne({_id: req.body.id})
		
		console.log("OneCourse \n")

		if(!course)
		{
			console.log("Course Not found")
			res.status(404).json("Course Not Found")
			return
		}

		res.status(200).json(course)
	}
	catch(error){
		console.log("Get Course", error)
		res.status(500).json(error)
	}
}



//TODO: update Course, Remove Video, update Video detail

module.exports={AddCourse, AddVideo,AllCourses,DeleteCourse,getOneCourse}
