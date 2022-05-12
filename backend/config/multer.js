const multer = require("multer");
const fs = require("fs");

module.exports.upload = (folderName) =>
	multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				const path = `uploads/${folderName}`;
				if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
				cb(null, path);
			},
			filename: (req, file, cb) => {
				const ext = file.mimetype.split("/")[1];
				cb(null, `${Date.now()}.${ext}`);
			},
		}),
	});
