const mongoose = require('mongoose')

const trendCourseSchema= new mongoose.Schema(

	{
		courseId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'courses',
			required: [true, 'Must Provide Valid Course Id ']
		},
		
		ImgPath: {
			type: String
		}

	}
)


module.exports= mongoose.model("trend_courses", trendCourseSchema)
