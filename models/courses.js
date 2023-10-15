const mongoose= require('mongoose')

const courseSchema= new mongoose.Schema(
	{
	
		Name: {
			type: String,
			required:[true,"Name must be provided"],
			unique:[true, "Course Name already taken"],
			minlength: [1,"Name must have atleast 1 character"]
		}


	}
)
