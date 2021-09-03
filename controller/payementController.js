/** @format */
const keys = require("../config/keys");
const { handleResponse, handleError } = require("../config/requestHandler");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = {
	addPayement: async (req, res) => {
		try {
			const amount = 2500;
			const customer = await stripe.customers.create({
				email: req.body.stripeEmail,
				source: req.body.stripeToken,
			});
			if (customer) {
				const charge = await stripe.charges.create({
					amount,
					description: "Web Development Ecommerce",
					currency: "INR",
					customer: customer.id,
				});
				if (charge) {
					return res.render("success");
				}
			} else {
				return handleResponse({ res, msg: "Customers Doesn't Exist" });
			}
		} catch (error) {
			return handleError({ res, error, data: error });
		}
	},
};
