const stripe = require('stripe')(process.env.STRIPE_SK);

const uuid = require("uuid");

const CoursePayment = async (req,res)=>{
	
	const {product, token}= req.body

	const IdempotencyKey = uuid()

	return stripe.customers.create({
		email: token.email,
		source: token.id
	})
	.then (customer => {
		
		stripe.charges.create({

			amount: product.price*100,
			currency: 'inr',
			customer: customer.id,
			receipt_email: token.email,
			description: `purchase of ${product.name}`,
			shipping: {
				name: token.card.name,
				address: {
					country: token.card.address_country
				}
			}
		},{IdempotencyKey})

	})
	.then(result => res.status(200).json(result))
	.catch(err => console.log(err))

}

module.exports= CoursePayment
