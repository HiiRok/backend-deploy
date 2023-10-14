const express= require('express');
const app= express();
require('dotenv').config()
const connectDB=require('./db/connect')

app.use(express.json())


const start = async ()=> {

	try{
		
		await connectDB(process.env.MONGO_URL)
		app.listen(process.env.PORT, ()=>{

			console.log("Admin Server started at port 3001")
		})
	}

	catch(error){
		console.log(error)
	}
}


start();
