import axios from 'axios';
import React from 'react';
import swl from 'sweetalert'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const StocksTable = ({ stocks, deleted, setDeleted }) => {
	const deleteStock = async (stock) => {
		try {
			  
		  const response = await axios.delete(
			`${process.env.REACT_APP_BACKEND_URL}/api/stock/delete`,
			{
			  headers: {
				'Content-Type': 'application/json'
			  },
			  data: {
				id: stock.itemID
			  }
			}
		  );
	
		  if (response.status === 200) {
			setDeleted(deleted + 1);
			toast(response.data.message, { type: toast.TYPE.SUCCESS });
			window.location('/stock')
		  }
		} catch (error) {
		  toast(error.response.data.message, { type: toast.TYPE.ERROR });
		}
	  };
	return (
		<div className='container'>
			<div className="shadowBox">
				<div className="row">
					<div className="col-12">
						<table class="table table-hover">
							<thead className="table-primary">
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Item ID</th>
									<th scope='col'>Supplier ID</th>
									<th scope='col'>Item Name</th>
									<th scope='col'>Unit Price</th>
									<th scope='col'>QTY</th>
									<th scope='col'>Total price</th>
									<th scope='col'>Arrived Date</th>
									<th scope='col'>Description</th>
									<th scope='col'>Manage</th>
								</tr>
							</thead>
							<tbody>
								{stocks.map((stock, index) => {
									return (
										<tr key={index}>
											<th scope='row'>{index + 1}</th>
											<td>{stock.itemID}</td>
											<td>{stock.supplierId}</td>
											<td>{stock.itemName}</td>
											<td>{stock.unitPrice}</td>
											<td>{stock.qty}</td>
											<td>{stock.unitPrice * stock.qty}</td>
											<td>{stock.date.substring(0,10)}</td>
											<td>{stock.description}</td>
	
											<td>
												<Link to={`/update-stock/${stock.itemID}`} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
													<i class="far fa-edit"></i>&nbsp;Edit
												</Link>&nbsp;&nbsp;
												<Link
													className='btn btn-danger'
													onClick={() => {
														if (
															window.confirm(
																'Are you sure you need to delete this stock?'
															)
														)
															deleteStock(stock);
													}}>
													<i className="far fa-trash-alt"></i>&nbsp;Delete
												</Link>												
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StocksTable;
