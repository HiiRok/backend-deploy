const mongoose= require('mongoose')


const contentSchema = new mongoose.Schema({
	id: {
	  type: mongoose.Schema.Types.ObjectId, // or you can use ObjectId if you prefer: type: Schema.Types.ObjectId
	  required: true
	},
	title: {
	  type: String,
	  required: true
	},
	duration: {
	  type: Number,
	  required: true
	},
	videoUrl: {
	  type: String,
	  required: true
	}
  });


const courseSchema= new mongoose.Schema(
	{
	
		Name: {
			type: String,
			required:[true,"Name must be provided"],
			unique:[true, "Course Name already taken"],
			minlength: [1,"Name must have atleast 1 character"]
		},

		Brief_Desc: {
			type: String,
			required: [true, "Must provide some description"],
			maxlength: [500,"Must not Exceed 500 characters"]
		},

		Price: {
			type: Number,
			required:[true, "Must provide a price"]
		},

		Author: {
			type: String
		},

		//Objectives are array of strings. 
		Objectives: {
			type: Array,
			required: [true, "Must provide Course Objectives"]
		},

		Content: [contentSchema],   // contains the ids of all the videos it contains,

		ImgPath: {
			type: String // contains path to the thumbnail
		}

	}
)


module.exports=mongoose.model("Courses",courseSchema)
