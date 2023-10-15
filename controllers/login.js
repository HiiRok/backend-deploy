const Users= require('../models/user')
const cryptojs= require('crypto-js')

const login= async (req,res)=> {

	const {email,password}= req.body

	try{
		
		const user= await Users.findOne({email})

		if(!user)
		{
			console.log("User not found")
			res.status(404).json("Wrong Username or Password")
		}

		else
		{
			const bytes= cyptojs.AES.decrypt(user.password,process.env.JWT_SECRET) 
			const originalPassword= bytes.toString(cryptojs.enc.Utf8)

			if(originalPassword!==password)
			{
				console.log("Wrong Password")
				res.status(404).json("Wrong Username or Password")
			}

			else
			{
				const token= user.createJWT();

				res.status(201).json({user_info:{email:user.email,id:user._id,username:user.userName},token})
			}
		}
	}

	catch(error){
		res.status(500).json(error)
	}
}


module.exports=login
