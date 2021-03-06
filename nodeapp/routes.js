/* jshint unused:false */
'use strict';

var stripe = require('stripe')(process.env.STRIPE_SECRET); // update it with real one on production

var crypto = require('crypto'); // for AWS S3
var moment = require('moment');
var AWS_BUCKET = 'coderfront';
var S3_KEY = process.env.S3_KEY;
var S3_SECRET = process.env.S3_SECRET;

var mcApi = require('mailchimp').MailChimpAPI;
var MC_API_KEY = process.env.MC_API_KEY;
var MC_ENDPOINT = 'https://us8.api.mailchimp.com/2.0/';

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

	// AWS S3 credentials
	app.get('/s3credentials', function(req, res) {
		var s3Policy = {
			'expiration': moment().add('hours', 1).toISOString(),
			'conditions': [
				['starts-with', '$key', ''],
				{'bucket': AWS_BUCKET},
				{'acl': 'public-read'},
				['starts-with', '$Content-Type', '']
			]
		};

		// stringify and encode the policy
		var stringPolicy = JSON.stringify(s3Policy);
		var base64Policy = new Buffer(stringPolicy, 'utf8').toString('base64');

		// sign the base64 encoded policy
		var signature = crypto.createHmac('sha1', S3_SECRET)
			.update(new Buffer(base64Policy, 'utf8')).digest('base64');

		// build the results object and return it
		res.json({
			policy: base64Policy,
			signature: signature,
			key: S3_KEY
		});

	});

	// MailChimp API
	app.post('/mailchimp', function(req, res) {
		try { 
		    var api = new mcApi(MC_API_KEY, { version : '2.0' });
		} catch (error) {
		    console.log(error.message);
		}

		var listId = req.body.listId;
		var email = req.body.subscriber.email;
		var mergeVars = {
			EMAIL: req.body.subscriber.email,
			FNAME: req.body.subscriber.firstname,
			LNAME: req.body.subscriber.lastname
		};
		
		var mcParams = {
			apikey: MC_API_KEY, 
			id: listId, 
			email: { email: email }, 
			merge_vars: mergeVars
		};

		api.call('lists', 'subscribe', mcParams, function (error, data) {
			if(error) {
				console.log(error);
				res.status(500).send({ error: error.message });
			} else {
				console.log(data);
				res.status(204).send({ data: JSON.stringify(data) });
			}
		});

	});

};