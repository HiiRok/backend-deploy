const mongoose= require('mongoose')

const courseSchema= new mongoose.Schema(
	{
	
		Name: {
			type: String,
			required:[true,"Name must be provided"],
			unique:[true, "Course Name already taken"],
			minlength: [1,"Name must have atleast 1 character"]
		}

		Brief_Desc: {
			type: String,
			required: [true, "Must provide some description"],
			maxlength: [500,"Must not Exceed 500 characters"]
		},

		Price: {
			type: Number,
			required:[true, "Must provide a type"]
		},

		Author: {
			type: String
		},

		//Objectives are array of strings. 
		Objectives: {
			type: Array,
			required: [true, "Must provide Course Objectives"]
		},

		Content: {
			type: Array
		}

	}
)


module.exports=mongoose.model("Courses",courseSchema)
