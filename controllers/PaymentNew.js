
const stripe = require("stripe")(process.env.STRIPE_SK)

const CoursePayment = async (req, res)=> {

	
	console.log("Inside Payment New backend")

	const {course}= req.body;
	console.log(course);


	try {
	const paymentIntent= await stripe.paymentIntents.create({
		
		currency: 'inr',
		amount: course.Price *100,
		//payment_method_types: ['card', 'upi'],
		automatic_payment_methods: {
			enabled: true,
		},
			
	});
	

	res.send({clientSecret: paymentIntent.client_secret});

		//console.log(paymentIntent.client_secret)
	}

	catch(error){
		console.log(error);
		res.status(400).send({ error: { message: error.message}})
	}
}

module.exports= CoursePayment;


