const express= require('express');

const app= express();


app.use(express.json())


const start = async ()=> {

	try{
	
		app.listen(3001, ()=>{

			console.log("Admin Server started at port 3001")
		})
	}

	catch(error){
		console.log(error)
	}
}


start();
