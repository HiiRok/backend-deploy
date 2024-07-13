const mongoose=require('mongoose')
const jwt= require('jsonwebtoken')

const userSchema = new mongoose.Schema(

	{

		userName: {
			type: String,
			required: [true, "Must provide username"],
			unique: [true, "Username must Unique"],
			minlength:[1,"username must have atleast 1 character"]
		},

		email: {

			type: String,
		
			required: [true, "Must provide email"],
			unique: [true, "Email already registered"],

			match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"]
		},

		password: {
			type: String,
			required: [true, "Must provide a password"],
			minlength: [8,"Password must contain atleast eight characters"]
		},

		courses: {
			type: Array,
		},

		Age:{
			type: Number,
			required: [true,"Must provide age"]
		},

		Gender:{
			type: String,
			required:[true, "Must provide Gender"]
		},

		organization: {
			type: String,
		},
		token:{
			type: String,
			default:''
		}
	}
)


userSchema.methods.createJWT= function () {

		return jwt.sign({userID:this._id, email: this.email, username: this.userName},
			process.env.JWT_SECRET,
			{expiresIn: "180d"}
		)
}

module.exports=mongoose.model('adminUsers',userSchema)
