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
//TODO: update Course, delete Course, Add Video, Delete Video, update Video detail

module.exports={AddCourse}
