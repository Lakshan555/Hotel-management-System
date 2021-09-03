const Stock = require('../models/Stock-model');
const StockOrder = require('../models/Stock-model');

const addStock = async (req, res, next) => {
	const {
		itemID,
		supplierId,
		itemName,
		date,
		qty,
		unitPrice,
		totalPrice,
		description
	} = req.body;

	let stocks;
	try {
		stocks = await Stock.find({
			$or: [
				{
					itemID: itemID.toUpperCase()
				},
				{
					supplierId: supplierId
				},
				{
					itemName: itemName
				}
				,{
					date: date
				}
			]
		});

		if (stocks.length > 0) {
			return res.status(400).json({
				message:
					'There is an another stocks using  same Item Id , Please re check and try again'
			});
		}

		const stock = new Stock({
			itemID: itemID.toUpperCase(),
			supplierId,
			itemName,
			date: date ? date : Date.now(),
			qty,
			unitPrice,
			totalPrice: qty * unitPrice,
			description
		});

		await stock.save();
		return res.status(201).json({ message: 'New Stock Added successfully ', stock });
	} catch (err) {
		return res.status(500).json({
			message: 'Server error while adding a stock. Please try again'
		});
	}
};

const getStocks = async (req, res, next) => {
	try {
		const stocks = await Stock.find();
		if (stocks.length == 0) {
			return res.status(404).json({ message: 'No stocks found yet' });
		}
		return res.status(200).json({ message: 'Suppliers found', stocks });
	} catch (err) {
		return res.status(500).json({
			message: 'Server error while getting stocks. Please try again'
		});
	}
};

const getStockById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const stock = await Stock.findOne({
			itemID: id.toUpperCase()
		});
		if (!stock) {
			return res.status(404).json({
				message: `No stock found for the id - ${id}, please re-check and try again`
			});
		}
		return res.status(200).json({ message: 'Stock found', stock });
	} catch (err) {
		return res.status(500).json({
			message: `Server error while getting stock with id - ${id}. Please try again`
		});
	}
};

const updateStock = async (req, res, next) => {
	const {
		itemID,
		supplierId,
		itemName,
		date,
		qty,
		unitPrice,
		totalPrice,
		description
	} = req.body;
	let upStock;
	try {
		upStock = await Stock.findOne({ itemID });
		if (!upStock) {
			return res
				.status(404)
				.json({ message: 'No stock found for this id' });
		}
		// if (upStock.supplierId != supplierId) {
		// 	let checkStock = await Stock.findOne({ supplierId });
		// 	if (checkStock) {
		// 		return res.status(400).json({
		// 			message:
		// 				'There is an another stock using this new supplierId. Please select a new one'
		// 		});
		// 	}
		// 	upStock.supplierId = supplierId;
		// }
	
		if (upStock.supplierId != supplierId)
			upStock.supplierId = supplierId;

		if (upStock.itemName != itemName)
			upStock.itemName = itemName;

		if (upStock.date != date)
		upStock.date = date;

		if (upStock.qty != qty)
		upStock.qty = qty;

		if (upStock.qty != qty) {
			upStock.qty = qty;
			upStock.totalPrice = qty * unitPrice;
		}

		if (unitPrice != upStock.unitPrice) {
			upStock.unitPrice = unitPrice;
			upStock.totalPrice = qty * unitPrice;
		}
		description
		if (upStock.description != description)
		upStock.description = description;

		console.log(upStock);
		await upStock.save();
		return res
			.status(200)
			.json({ message: 'Stock updated successfully', upStock });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message:
				'Server error while updating the stock, please try again'
		});
	}
};

const deleteStock = async (req, res, next) => {
	const { id } = req.body;
	try {
		let stock = await Stock.findOne({ itemID: id });
		if (!stock) {
			return res.status(404).json({
				message: `There is no stock with ${id} - id, Please recheck and try again`
			});
		}

		await StockOrder.deleteMany({
			itemID: stock._id
		});

		await stock.remove();
		return res
			.status(404)
			.json({ message: 'Stock successfully removed ' });
	} catch (err) {
		return res.status(500).json({
			message:
				'Server error while deleting the stock, Please try again'
		});
	}
};

exports.addStock = addStock;
exports.getStocks = getStocks;
exports.getStockById = getStockById;
exports.updateStock = updateStock;
exports.deleteStock = deleteStock;
