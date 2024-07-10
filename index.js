const express= require('express');
const app= express();
const cors= require('cors')

require('dotenv').config()

const connectDB=require('./db/connect')

const userRouter= require('./routes/userRouter')
const authMiddleware= require('./middlewares/authenticate')
const courseCatRouter= require('./routes/course_routes')
const {noAuthTrendRouter, AuthTrendRouter} = require('./routes/trendCoursesRoute')
const checkCoursePurchase=require('./routes/coursePurchase')
const path = require('path');

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname,'res/imgs')))

app.use('/api/trend_course', noAuthTrendRouter)
app.use('/api/trend_course/auth',authMiddleware, AuthTrendRouter)

app.use('/api/user',userRouter)
app.use('/api/course',authMiddleware,courseCatRouter)
app.use('/api/checkCoursePurchase',authMiddleware,checkCoursePurchase)


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
