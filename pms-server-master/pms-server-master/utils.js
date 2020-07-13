const bcrypt = require("bcrypt");

module.exports = {
	hashPassword: function (planTextPassword) {
		const saltRounds = 10;
		return bcrypt.hashSync(planTextPassword, saltRounds);
	},

	checkPassword: function (planTextPassword, hashedPassword) {
		return bcrypt.compareSync(planTextPassword, hashedPassword);
	},
};
