const express = require('express');
const {
	getStocks,
	getStockById,
	addStock,
	updateStock,
	deleteStock
} = require('../controllers/Stock-controller');

const router = express.Router();

router.get('/:id', getStockById);
router.get('/', getStocks);
router.post('/', addStock);
router.put('/update', updateStock);
router.delete('/delete', deleteStock);

module.exports = router;
