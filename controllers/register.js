const Users= require('../models/user')
const cryptojs= require('crypto-js')

const register= async (req,res)=> {

	console.log("In Register")

	try {
		const newUser= {

			userName: req.body.username,
			email: req.body.email,
			password: cryptojs.AES.encrypt(req.body.password,process.env.JWT_SECRET).toString()
		};
		const user= await Users.create(newUser)
		const token= user.createJWT();
		res.status(201).json({user,token})

	}

	catch(error){
		console.log(error)
		res.status(500).json(error)
	}
}

module.exports=register
