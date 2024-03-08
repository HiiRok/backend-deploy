const trendCourses= require('../models/trend_courses')
const Courses = require('../models/courses')

const getAll = async (req,res)=> {

	try{
		
		console.log("Inside trendCourses.getAll")
		const result = await trendCourses.find({})

		res.status(200).json(result);

	}catch(error){

		console.log("Inside trendCourses.getAll: error: " + error)
		res.status(500).json({errMsg: "Internal Server Error", err: error})
	}
}


const createOne= async (req,res) => {
	
	try{
		
		const courseId= req.body.courseId;
		const course= await Courses.findById({_id: courseId});

		console.log(course)

		if(!course){
			
			console.log("Creating Trend Course: Error: Course Not Found in Courses Collection ")
			res.status(404).json("Course Not found in Courses Collection")
			return
		}

		const newTrendCourse = {
			
			Name: course.Name,
			Brief_Desc: course.Brief_Desc,
			Price: course.Price,
			Author: course.Author,
			Objectives: course.Objectives,
			ImgPath: course.ImgPath,
			Content: course.Content,
			courseId: req.body.courseId,
		}

		//console.log("New Trend Course: \n", newTrendCourse)

		const trendCourse = await trendCourses.create(newTrendCourse);

		console.log("Trend Course:\n ", trendCourse)

		res.status(201).json("New Trend Course Added Successfully")

	}catch(error){

		console.log(error)
		res.status(500).json({msg:"Internal Server Error", err: error})
	}
}


module.exports= {getAll, createOne}
