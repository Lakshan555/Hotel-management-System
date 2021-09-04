import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StocksTable from './StocksTable';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './stockStyls.css'

const ViewSuppliers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [stocks, setStocks] = useState([]);
	const [baseData, setBaseData] = useState([]);
	const [deleted, setDeleted] = useState(0);
	const doc = new jsPDF('landscape');

	const downloadReport = () => {
		doc.text('Stock report', 30, 10);

		let array = [];
		stocks.map((stock, index) => {
			let row = [];
			row.push(index + 1);
			row.push(stock.itemID);
			row.push(stock.supplierId);
			row.push(stock.itemName);
			row.push(stock.unitPrice);
			row.push(stock.qty);
			row.push(stock.unitPrice * stock.qty);
			row.push(stock.date.substring(0,10));
			row.push(stock.description);
			array.push(row);
			return row;
		});

		doc.autoTable({
			head: [['#', 'Item ID', 'Supplier Id', 'Item Name', 'Unit Price', 'qty', 'Total price', 'Date', 'Description']],

			body: array

		});

		doc.save('stocks.pdf');
	};

	useEffect(() => {
		async function gedData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/stock`
				);
				if (response.status === 200) {
					setStocks(response.data.stocks);
					setBaseData(response.data.stocks);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
			}
			setIsLoading(false);
		}
		gedData();
	}, [deleted]);

	const search = (inp) => {
		if (!inp.target.value) {
			setStocks(baseData);
		} else {
			// if(inputvalue === supplierID || inputvalue === supplierId)
			let searchList = baseData.filter(
				(data) =>
					data.itemID
						.toLowerCase()
						.includes(inp.target.value.toLowerCase()) ||
					data.supplierId
						.toLowerCase()
						.includes(inp.target.value.toLowerCase())||
					data.date
					.toLowerCase()
					.includes(inp.target.value.toLowerCase())
			);
			setStocks(searchList);
		}
	};

	return (
		<>
			<div className="container containerTop">
				<div className="row">
					<div className="col-12">
						<div className="row">
							<div className="col position-relative link">
								<p>Stock Management</p>
							</div>
						</div>
						<div className="row">
							<div className="col-9 position-relative">
								<h1 className='display-5 fw-bold'>Stock Details</h1>
								< ToastContainer />
							</div>
							<hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
						</div>
						<div className="row">
							<div className="col-2 buttons">
								<Link to="/add-new-stock" type="button" class="btn button_add" style={{marginLeft:'5px'}} ><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Stock</Link><br /><br />
							</div>
							<div className="col-2 buttons">
								<Link onClick={downloadReport} class="btn button_add2" style={{width:'190px'}}><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
							</div>
							<div className="col-2 buttons">
								<Link to="/order-Request" type="button" class="btn button_pdf" ><i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;Order Request</Link><br /><br />
							</div>
							{/* <div className="col-2 buttons2">
								<Link onClick={downloadReport} class="button_pdf"  style={{marginLeft:'2px'}}><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
							</div> */}
							
							<div className="col-3 search position-relative" style={{ marginTop: '20px',marginLeft:'320px' }}>
								<i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search Stock" name="searchQuery" onChange={search} />
							</div>
						</div>
					</div>
				</div>

			{isLoading ? (
				<div className='container text-center py-5'>
					<Loader
						type='Oval'
						color='#0d6efd'
						height={30}
						width={30}
					/>
				</div>
			) : stocks.length > 0 ? (
				<>

					<StocksTable
						stocks={stocks}
						setDeleted={setDeleted}
						deleted={deleted}
					/>

				</>
			) : (
				<div className='container text-center py-5'>
					<h3>No stocks found</h3>
				</div>
			)}
			</div>			
		</>
	);
};

export default ViewSuppliers;
