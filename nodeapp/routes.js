/* jshint unused:false */
'use strict';

var stripe = require('stripe')('sk_test_BiXbus56OIaKgkp3B7ftheQp'); // update it with real one on production
var moment = require('moment');

module.exports = function(app) {
	// stripe charge
	app.post('/charge', function(req, res) {
		var stripeToken = req.body.stripeToken;
		var amount = req.body.amount;
		var description = req.body.description;

		var chargeObj = {
			card: stripeToken,
			currency: 'cad',
			amount: amount,
			description: description
		};

		stripe.charges.create(chargeObj, function(err, charge) {
			if(err) {
				res.send(500, err);
			} else {
				res.send(204);
			}
		});

	});
};