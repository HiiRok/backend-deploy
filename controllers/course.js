const Courses= require('../models/courses')

const AddCourse= async (req,res)=> {

	const newCourse={
		Name: req.body.Name,
		Brief_Desc: req.body.description,
		Price: req.body.price,
		Author: req.body.Author,
		Objectives: req.body.objectives
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
		
		console.log(course)

		if(!course){
			console.log("course not found")
			res.status(404).json("Course not found")
		}

		else
		{
			let videoArray= [];

			videoArray.push(req.body.video_id)

			console.log(videoArray)

			const result= await Courses.updateOne({_id:course._id},{Content:videoArray})
			
			res.status(200).json({msg:"update Successful", modified: result.modifiedCount})
		}
	}

	catch(error){
		
		console.log(error)
		res.status(500).json("Internal server error")
	}
}

//TODO: update Course, delete Course, Add Video, Delete Video, update Video detail

module.exports={AddCourse, AddVideo}
