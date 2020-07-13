const errors = require("restify-errors");
const Property = require("../models/property");
const fs = require("fs");
const mv = require("mv");
const uuid = require("uuid");

module.exports = (server) => {
	// Register Property
	server.post("/add-property", async (req, res, next) => {
		let {
			name,
			description,
			area,
			type,
			owner,
			isAvailableForBuy,
			buyPrice,
			isAvailableForRent,
			isDeleted,
			rentPrice,
			rentedTo,
			photos,
		} = req.body;
		console.log(`Adding property ${name}`);

		isDeleted = false;

		const property = new Property({
			name,
			description,
			area,
			type,
			owner,
			isAvailableForBuy,
			buyPrice,
			isAvailableForRent,
			isDeleted,
			rentPrice,
			rentedTo,
			photos,
		});
		// Save User
		try {
			const newProperty = await property.save();
			res.send({
				status: 201,
				statusText: "Property added Successfully",
				data: newProperty,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});

	server.post("/upload-property-images", (req, res, next) => {
		try {
			const files = req.files;
			let imgIds = [];
			for (var key in files) {
				if (files.hasOwnProperty(key)) {
					let extension = "." + files[key].name.split(".").pop();
					let filename = uuid.v4() + extension;
					console.log("Uploading:", files[key].name);
					// fs.renameSync(
					// 	files[key].path,
					// 	`${__dirname}\\..\\uploads\\${filename}`
					// );
					mv(
						files[key].path,
						`${__dirname}\\..\\uploads\\${filename}`,
						{
							clobber: false,
						},
						function (err) {
							console.log("Error in moving file", err);
						}
					);
					//fs.unlink(files[key].path, () => {});
					imgIds.push(filename);
				} else continue;
			}
			res.send({
				status: 202,
				statusText: "Image(s) uploaded successfully",
				data: imgIds,
			});
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
		}
	});

	server.post("/admin-update-property", async (req, res, next) => {
		let {
			id,
			name,
			description,
			area,
			type,
			owner,
			isAvailableForBuy,
			buyPrice,
			isAvailableForRent,
			isDeleted,
			rentPrice,
			rentedTo,
			photos,
		} = req.body;
		console.log(`Updating property ${name}`);
		if (photos.length < 4) {
			photos = [];
		} else photos = photos.replace(/(^;)|(;$)/g, "").split(";");

		// Save User
		try {
			const filter = { _id: id };
			const update = {
				name,
				description,
				area,
				type,
				owner,
				isAvailableForBuy,
				buyPrice,
				isAvailableForRent,
				rentPrice,
				rentedTo,
				photos,
			};
			const property = await Property.findOneAndUpdate(filter, update);
			res.send({
				status: 200,
				statusText: "Property Updated Successfully",
				data: property,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});
	server.get("/list-properties", async (req, res, next) => {
		try {
			const properties = await Property.find({ isDeleted: false });

			res.send({
				status: 200,
				statusText: "Here are all Properties",
				data: properties,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});
	server.get("/get-property-details/:id", async (req, res, next) => {
		try {
			const property = await Property.findById({ _id: req.params.id });

			res.send({
				status: 200,
				statusText: "Here are property details",
				data: property,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});
	server.post("/search-properties", async (req, res, next) => {
		let { area } = req.body;
		let query = {
			$and: [{ area: area }, { isDeleted: false }],
		};
		try {
			let properties;
			if (area != "") properties = await Property.find(query);
			else properties = await Property.find({ isDeleted: false });
			res.send({
				status: 200,
				statusText: "Properties are here",
				data: properties,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});

	server.post("/my-properties", async (req, res, next) => {
		let { userId } = req.body;

		try {
			const properties = await Property.find({
				owner: userId,
				isDeleted: false,
			});

			res.send({
				status: 200,
				statusText: "Here are my properties",
				data: properties,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});

	server.post("/my-fav-properties", async (req, res, next) => {
		let { favProperties } = req.body;
		let query = {
			_id: {
				$in: favProperties,
			},
			isDeleted: false,
		};
		try {
			const properties = await Property.find(query);

			res.send({
				status: 200,
				statusText: "Here are my favourite properties",
				data: properties,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});

	server.post("/delete-soft-property", async (req, res, next) => {
		let { propertyId } = req.body;
		try {
			const filter = { _id: propertyId };
			const update = { isDeleted: true };

			const property = await Property.findOneAndUpdate(filter, update);
			res.send({
				status: 200,
				statusText: "Property deleted successfully",
				data: propertyId,
			});
			next();
		} catch (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
			return next(new errors.InternalError(err.message));
		}
	});

	server.post("/delete-hard-property", async (req, res, next) => {
		let { propertyId } = req.body;

		try {
			const property = await Property.findByIdAndDelete({ _id: propertyId });

			res.send({
				status: 200,
				statusText: "Property deleted permanently",
				data: propertyId,
			});
			next();
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
