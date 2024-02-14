//  bring in  prisma and cookie

const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

// User signup
exports.signup = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			throw new Error("Please provide all fields");
		}
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});

		// Send user a token
		cookieToken(user, res);
	} catch (error) {
		throw new Error(error);
	}
};

// User sigin

exports.login = async (req, res, next) => {
	try {
		// take info from user
		const { email, password } = req.body;

		if (!email || !password) {
			throw new Error("Pls provide email and passowrd");
		}

		// find a user based on email

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		// when there is no user
		if (!user) {
			throw new Error("No user  found");
		}

		// password mismatch
		if (user.password !== password) {
			throw new Error("Password not correct");
		}

		// At this stage user is there and validation okay
		cookieToken(user, res);
	} catch (error) {
		throw new Error(error);
	}
};

// User logout
exports.logout = async (req, res, next) => {
	try {
		res.clearCookie("token");
		res.json({
			success: true,
		});
	} catch (error) {
		throw new Error(error);
	}
};
