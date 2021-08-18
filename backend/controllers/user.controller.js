const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	register: (req, res) => {
		console.log("in register");
		console.log(req.body);

		const user = new User(req.body);

		user.save()
			.then((newUser) => {
				console.log("Successfully registered");
				console.log(newUser);
				res.json({
					message: "Successfully Registered",
					user: newUser
				})
			})
			.catch((err) => {
				console.log("register NOT successful");
				res.status(400).json(err);
			});
	},

	// login
	login: (req, res) => {
		User.findOne({ email: req.body.email })
			.then((userRecord) => {
				// check if this returned object is null
				if(userRecord === null) {
					// email not found in the collection / DB
					res.status(400).json({ message: "Invalid Login Attempt" });
				} else {
					// the email address was found
					// compare the address given to us in the request with the one stored in the DB
					bcrypt.compare(req.body.password, userRecord.password)
						.then((isPasswordValid) => {
							if (isPasswordValid) {
								console.log("password is valid");
								console.log(userRecord);
								console.log(process.env.JWT_SECRET);
								res.cookie("usertoken", // name of the cookie
									jwt.sign({
										// payload is the data I want to save
										user_id: userRecord._id,
										email: userRecord.email,
										username: userRecord.username
									},
									process.env.JWT_SECRET), // used to sign / hash the data in the cookie
									{
										// configuration settings for this cookie
										httpOnly: true,
										expires: new Date(Date.now() + 9000000)
									}
								)
								.json({
									message: "Successfully logged in",
									userLoggedIn: userRecord.username
								})

							} else {
								// passwords didn't match
								res.status(400).json({ message: "Invalid Login Attempt" });
							}
						})
					.catch((err) => {
						console.log("error with compare pws")
						res.status(400).json({ message: "Invalid Login Attempt" });
					})
				}
			})
			.catch((err) => {
				console.log("error with find one")
				res.status(400).json({ message: "Invalid Login Attempt" });
			})
	},

	logout: (req, res) => {
		console.log("logging out!");
		res.clearCookie("usertoken");  // same name as above for saving the cookie
		res.json({
			message: "You have successfully logged out",
		})
	},
	removeFavorite: (req, res) => {
		console.log("inside remove favorite")
		console.log("get favorite id" + req.params.id)
		//what are the next three lines going to do for us ?
		//recieve user taken from client, decode data from user token and store the users id into user_id variable,
		//console log user_id
		const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true });
        const user_id = decodedJwt.payload.user_id;// payload object holds more than just user id
		console.log("user id: " + user_id)
		User.findByIdAndUpdate(user_id, {
			$pull: { favorites: req.params.id },
		},
			{new:true, useFindAndModify:false}
		)
			.populate("favorites", "-__v")
			.then((updatedUser) => {
				console.log(updatedUser)
				res.json(updatedUser)
			})
			.catch((err) => {
				res.status(400).json(err)
			})
		
	}
}