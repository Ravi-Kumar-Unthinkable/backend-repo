const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const userSchema = require("../model/users");
const reponse = require('../utils/response');

dotenv.config({ path: "./config.env" });


const loginController = (req, res, next) => {
	console.log('@@@');
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const { email, password } = req.body;

  userSchema.find({ email: email }, (err, user) => {
		if (user) {
			console.log('user', user)
			if(user[0].password === password) {
				const token = jwt.sign({...user[0]}, jwtSecretKey , {expiresIn : "2h"} );
				res.status(200).send({ ...reponse.successResponse, token, status: 200, message: `login success`});
			}
		} else  {
			res.status(400).send({ ...reponse.errorResponse , status: 400 ,message: `user not found`});
		}

		if(err) {
			res.status(400).send({error: err});
		}
	});
};

const signUpController = (req, res, next) => {

	const {name, email, password} = req.body;

	userSchema.find({email: email}, (err, user) => {
		if(err) {
			res.status(400).send({ ...reponse.errorResponse, status: 400, message: err});
		}
		if(user){
			res.status(400).send({ ...reponse.errorResponse, status: 400, message: `Email mactched`});
		} else  {
			const user = new userSchema({
				name,
				email,
				password
			});
		
			user.save().then(
				(data) => {
					res.status(200).send({ ...reponse.successResponse, status: 200, data})
				})
				.catch((err) => {
					res.status(400).send({ ...reponse.errorResponse, status: 400, message: err})
				})
		}
	})
};

module.exports = { loginController, signUpController };
