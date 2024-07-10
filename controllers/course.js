const Courses= require('../models/courses')
const CatCourseRel= require('../models/cat_course_rel')
const trendCourses= require('../models/trend_courses')
const Users = require('../models/user')

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

const getOneCourseByParam= async (req,res)=>{
	
	try{
		const course= await Courses.findOne({_id: req.params.id})
		
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


const addCourseToUser = async (req,res)=>{

		
	console.log("Inside add Course to User")
	try{
		const user = await Users.findOne({_id:req.user.userID});
		let coursesList = user.courses;
		
		coursesList.push(req.body.courseId)

		const result = await Users.updateOne({_id:req.user.userID}, {courses:coursesList});

		res.status(200).json("Course added to User");

	}catch(error){

		console.log(error)
		res.status(500).json("Internal Server Error");
	}
	
}

const checkCoursePurchased = async (req,res)=>{

	console.log("Inside Check Course Purchase")

	try {
		const user = await Users.findOne({_id:req.user.userID});
		let coursesList = user.courses;

		let courseId= req.params.id
		let course

		if(coursesList.find(courseIdList=> courseIdList==courseId)){

			 course= await Courses.findOne({_id:courseId})
			 res.status(200).json({courseList:course, _id:user._id,hasBought:true })
			 return
		}
		res.status(200).json({courseList:course, _id:user._id, hasBought:false })
		
	} catch (error) {
		
		console.log(error)
		res.status(500).json("Internal Server Error")

	}

}


//TODO: update Course, Remove Video, update Video detail

module.exports={getOneCourseByParam,AddCourse, AddVideo,AllCourses,DeleteCourse,getOneCourse,addCourseToUser, checkCoursePurchased}
