const mongoose= require('mongoose')

const CatCourseSchema= new mongoose.Schema({

	catId: {
		type: String,
		required:[true, "Must provide category id"]
	},

	courseId:{
		type: String,
		required:[true, "Must provide Course Id"]
	}
		
})


module.exports= mongoose.model('Cat_Course', CatCourseSchema)
