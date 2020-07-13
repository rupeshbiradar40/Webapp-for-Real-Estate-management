const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	area: {
		type: String,
		required: false,
	},
	type: {
		type: String,
		required: false,
		trim: true,
	},
	owner: {
		type: String,
		required: true,
		trim: true,
	},
	isAvailableForBuy: {
		type: Boolean,
		required: true,
		trim: true,
	},
	buyPrice: {
		type: String,
		required: false,
		trim: true,
	},
	isAvailableForRent: {
		type: Boolean,
		required: true,
		trim: true,
	},
	isDeleted: {
		type: Boolean,
		required: true,
	},
	rentPrice: {
		type: String,
		required: false,
		trim: true,
	},
	rentedTo: {
		type: String,
		required: false,
		trim: true,
	},
	photos: [
		{
			type: String,
			required: false,
			trim: true,
		},
	],
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
