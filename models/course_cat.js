const mongoose= require('mongoose')

const courseCats= new mongoose.Schema(

	{
		Name:{
			type: String,
			required:[true, "Must provide a name"],
			minlength:[1,"Name atleast one character long"],
			unique:[true,"Name already exists"]
		},

		content:{
			type: Array
		}
	}
)

module.exports= mongoose.model('Course_Categories',courseCats);
