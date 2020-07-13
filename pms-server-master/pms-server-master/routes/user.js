const errors = require("restify-errors");
const User = require("../models/User");
const utils = require("../utils");

module.exports = (server) => {
	// Register User
	server.post("/register", async (req, res, next) => {
		let {
			username,
			password,
			firstname,
			lastname,
			contact,
			city,
			zip,
			state,
			favProperties,
		} = req.body;
		const role = "user";
		password = utils.hashPassword(password);
		console.log(`Register request for user ${username}`);
		const user = new User({
			username,
			password,
			role,
			contact,
			firstname,
			lastname,
			contact,
			city,
			zip,
			state,
			favProperties,
		});
		// Save User
		try {
			const newUser = await user.save();
			res.send({
				status: 201,
				statusText: "Register Successful",
				data: newUser,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: "Internal Server Error",
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});

	// Login User
	server.post("/login", async (req, res, next) => {
		const { username, password } = req.body;
		console.log(`Login request for user ${username}`);
		try {
			const dbuser = await User.findOne({ username });

			if (utils.checkPassword(password, dbuser.password)) {
				console.log("Login Success");
				res.send({
					status: 200,
					statusText: "Login Successful",
					data: dbuser,
				});
				next();
			} else {
				res.send({
					status: 401,
					statusText: "Login Failed",
					data: "",
				});
				next();
				console.log("Login Failed");
			}
		} catch (err) {
			res.send({
				status: 500,
				statusText: "Invalid User",
				data: "",
			});
			return next(new errors.InternalError(err.message));
		}
	});

	server.post("/toggle-fav-property", async (req, res, next) => {
		const { user, propertyId } = req.body;
		let username = user.username;
		console.log(user);
		try {
			let dbuser = await User.findOne({ username });
			let index = dbuser.favProperties.indexOf(propertyId);
			if (index > -1) {
				//console.log("Login Success");
				//property already present

				dbuser.favProperties.splice(index, 1);
				await dbuser.save();
				res.send({
					status: 200,
					statusText: "Property removed from favourites",
					data: dbuser,
				});
				next();
			} else {
				dbuser.favProperties.push(propertyId);
				await dbuser.save();
				res.send({
					status: 200,
					statusText: "Property marked as favourite",
					data: dbuser,
				});
				next();
			}
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});
};
