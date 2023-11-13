const Users= require('../models/user')
const jwt= require('jsonwebtoken')

const auth= async (req,res,next)=>{
	
	const authHeader= req.Headers.Authorization

	if(!authHeader || !authHeader.startsWith('Bearer '))
		res.status(403).json("Invalid Authentication")

	else
	{
		const token= authHeader.split(" ")[1]
		
		try{
		await jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{

			if(err)
				res.status(403).json("Invalid Token")

			else
			{
				req.user=user;

				next();
			}
		})
		}
		catch(error){
			console.log(error)
			res.status(501).json("Error during Authentication")
		}
	}

}

module.exports= auth;
