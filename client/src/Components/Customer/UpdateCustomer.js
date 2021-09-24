import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import './styles.css'



export default class UpdateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNo: Number,
            email: "",


        }
    }



    handleInputChange = (e) => {

        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {

        e.preventDefault();

        const id = this.props.match.params.id;
        const { customerId, firstName, lastName, address, phoneNo, email  } = this.state;


        const data = {
            customerId: customerId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phoneNo: phoneNo,
            email: email,

        }
        console.log(data)
        axios.put(`http://localhost:8000/customer/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast(`Customer Updated`, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        customerId: "",
                            firstName: "",
                            lastName: "",
                            address: "",
                            phoneNo: Number,
                            email: "",
                    }
                )
            };
        });

    };
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/customer/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    customerId: res.data.customer.customerId,
                    firstName: res.data.customer.firstName,
                    lastName: res.data.customer.lastName,
                    address: res.data.customer.address,
                    phoneNo: res.data.customer.phoneNo,
                    email: res.data.customer.email

                });
                console.log(this.state.customer);
            }
        })
    }




    render() {
        //const { formErrors } = this.state;

        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col position-relative link">
                        <p><Link to="/Customer_Home">Customer Home</Link> {'>'} Update</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9 position-relative">
                        <h1 className='display-5 fw-bold'>Update Customer </h1>
                        < ToastContainer />
                    </div>
                    <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>
                <div className="row ">
                    <div className="col-3" />
                    <div className="col-6 shadowBox" >
                        <form>
                            {/*customerId*/}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>CustomerId</label>
                                <input type="text"
                                    className="form-control"
                                    name="customerId"
                                    minLength="4"
                                    maxLength="7"
                                    placeholder="CID0001"
                                    value={this.state.customerId}
                                    onChange={this.handleInputChange} />
                               
                            </div>
                            {/* firstName */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>First Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange} />

                               

                            </div>
                            {/* LastName */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Last Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange} />

                               

                            </div>

                            {/* address */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter last name"
                                    value={this.state.address}
                                    onChange={this.handleInputChange} />



                            </div>



                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Phone No</label>
                                <input type="number"
                                    className="form-control"
                                    name="phoneNo"
                                    placeholder="Enter PhoneNo"
                                    value={this.state.phoneNo}
                                    onChange={this.handleInputChange} />

                               

                            </div>


                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Email</label>
                                <input type="email"
                                    className={"form-control"}
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                               
                            </div>






                            <center>
                                <div class="d-grid gap-2 col-6 mx-auto  ">
                                    <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Update</button>
                                </div>
                            </center>
                        </form>
                    </div>
                    <div className="col-3" />
                </div>
            </div>

        );
    };
}