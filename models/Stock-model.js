const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
	itemID: {
		type: String,
		require: true,
		unique: true
	},
	supplierId: {
		type: String,
		require: true,
		
	},
	itemName: {
		type: String,
		require: true,
		
	},
	date: {
		type: Date,
		default: Date.now()
	},
	qty: {
		type: Number,
		require: true
	},
	unitPrice: {
		type: Number,
		require: true
	},
	totalPrice: {
		type: Number,
		require: true
	},
	description :{
		type: String,
		require: true,
	}

});

module.exports = mongoose.model('Stock', StockSchema);
