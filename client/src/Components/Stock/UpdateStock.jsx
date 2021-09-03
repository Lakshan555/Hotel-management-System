import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const UpdateSupplier = () => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [stock, setStock] = useState({
		itemID: '',
		supplierId: '',
		itemName: '',
		date: '',
		qty: '',
		unitPrice: '',
		totalPrice: '',
		description: ''
	});

	const {
		itemID,
		supplierId,
		itemName,
		date,
		qty,
		unitPrice,
		totalPrice,
		description
	} = stock;

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/stock/${params.id}`
				);
				
				if (response.status === 200) {
					setIsLoading(false);
					setStock(response.data.stock);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
				setTimeout(() => {
					window.location.replace('/stock');
				}, 2000);
			}
		}
		getData();
	}, [params.id]);

	const handleChange = (e) => {
		setStock({ ...stock, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const response = await axios.put(
				`${process.env.REACT_APP_BACKEND_URL}/api/stock/update`,
				stock,
				config
			);

			if (response.status === 200) {
				toast(response.data.message, { type: toast.TYPE.SUCCESS });
				setStock({
					itemID: '',
					supplierId: '',
					itemName: '',
					date: '',
					qty: '',
					unitPrice: '',
					totalPrice: '',
					description: ''
				});
				setTimeout(() => {
					window.location.replace('/stock');
				}, 2000);
			}
		} catch (error) {
			toast(error.response.data.message, { type: toast.TYPE.ERROR });
		}
	};
	return (
		<>
		<div className="container containerTop">
			<div className="row">
				<div className="col position-relative link">
					<p><Link to="/stock">Stock Management</Link> {'>'} Add New Stock</p>
				</div>
			</div>
			<div className="row">
				<div className="col-9 position-relative">
					<h1 className='display-5 fw-bold'>Add New Stock</h1>
					< ToastContainer />
				</div>
			<hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
			</div>   
		<div className="row">
			<div className="col-2" />
				<div className="col-8 shadowBox" >
					<form onSubmit={handleSubmit}>
						<div className="row">
							
							<div className="col-6">
								<div className='form-group'>
									<label htmlFor='itemID'>Item ID</label>
									<input
										type='text'
										className='form-control'
										name='itemID'
										value={itemID}
										onChange={handleChange}
										required
										placeholder='Item ID'
									/>
								</div>									
							</div>

							<div className="col-6">
								<div className='form-group '>
									<label htmlFor='supplierId'>Supplier ID</label>
									<input
										type='text'
										className='form-control'
										name='supplierId'
										placeholder='SP0001'
										value={supplierId}
										onChange={handleChange}
										required
									/>
								</div>									
							</div>

						</div>

						<div className="row">
							<div className="col-6">
								<div className='form-group'>
									<label htmlFor='itemName'>Item Name</label>
									<input
										type='text'
										className='form-control'
										name='itemName'
										placeholder='Item Name'
										value={itemName}
										onChange={handleChange}
										required
									/>
								</div>									
							</div>
							<div className="col-6">
								<div className='form-group '>
									<label htmlFor='date'>Date</label>
									<input
										type='date'
										className='form-control'
										name='date'
										placeholder='2021-09-16'
										value={date}
										onChange={handleChange}
										

									/>
								</div>									
							</div>
						</div>

						<div className="row">
						<div className="col-6">
								<div className='form-group'>
									<label htmlFor='br_number'>Unit Price</label>
									<input
										type='number'
										className='form-control'
										name='unitPrice'
										placeholder='unitPrice'
										value={unitPrice}
										onChange={handleChange}
										required
									/>
								</div>										
							</div>
							<div className="col-6">
								<div className='form-group'>
									<label htmlFor='qty'>Quantity</label>
									<input
										type='number'
										className='form-control'
										name='qty'
										placeholder='10'
										value={qty}
										onChange={handleChange}
										required
									/>
								</div>										
							</div>
						
						</div>
						<div className="row">
							<div className="col-6">								
								<div className='form-group'>
									<label htmlFor='unitPrice'>Total price</label>
									<input
										type='number'
										className='form-control'
										name='unitPrice'
										placeholder='unitPrice'
										value={unitPrice * qty}
										readOnly
									/>
								</div>
							</div>																
							<div className="col-6">															
								<div className='form-group'>
									<label htmlFor='description'>Description</label>
									<textarea
										type='number'
										className='form-control'
										name='description'
										placeholder='Type Description'
										value={description}
										onChange={handleChange}
										required
									/>
								</div>																									
							</div>
						</div>
						<div className="row">
							<div className="col-4" />
							<div className="col-4">									
								<button type='submit' className='btn btn-primary sub_btn'>Add stock</button>
							</div>
							<div className="col-4" />
						</div>
					</form>
				</div>
			<div className="col-2" />
		</div>
		</div>
	</>
	);
};

export default UpdateSupplier;
