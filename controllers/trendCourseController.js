const trendCourses= require('../models/trend_courses')


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


module.exports= {getAll}
