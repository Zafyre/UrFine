function _getCallerFile() {
	var originalFunc = Error.prepareStackTrace;

	var callerfile;
	try {
		var err = new Error();
		var currentfile;

		Error.prepareStackTrace = function (err, stack) {
			return stack;
		};

		currentfile = err.stack.shift().getFileName();

		while (err.stack.length) {
			callerfile = err.stack.shift().getFileName();

			if (currentfile !== callerfile) break;
		}
	} catch (e) {}

	Error.prepareStackTrace = originalFunc;

	return callerfile;
}

module.exports = (...o) => {
	const callerFile = _getCallerFile();

	if (process.env.ENV != "development") {
		return;
	}
	console.log("────────────────────────────────────────────────");
	console.log("🐛 ", `[${callerFile.split("Dukhad Samay/backend/")[1]}]`, ...o);
	console.log("────────────────────────────────────────────────");
};
