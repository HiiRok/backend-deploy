const express= require('express');

const app= express();

require('dotenv')

app.use(express.json())


const start = async ()=> {

	try{
	
		app.listen(process.env.PORT, ()=>{

			console.log("Admin Server started at port 3001")
		})
	}

	catch(error){
		console.log(error)
	}
}


start();
