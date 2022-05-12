const jwt = require("jsonwebtoken");

module.exports =
	(role = "Any") =>
	(req, res, next) => {
		// get token from header
		const token = req.header("x-auth-token");

		if (!token) {
			return res.status(401).json({ message: "No Token!" });
		}

		// verify token
		try {
			// decode token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// set req user = decoded user
			req.user = decoded;

			if (role !== "Any" && req.user.role != role) {
				return res.status(403).json({ message: "Invalid Role" });
			}

			next(); // callback, important , o.w. we'll get stuck here only
		} catch (err) {
			res.status(401).json({ message: "Invalid / Expired Token!" });
		}
	};
