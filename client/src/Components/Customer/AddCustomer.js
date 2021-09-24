import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import './styles.css'

const invoiceRegx = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/gm);
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNo: Number,
            email: "",


            formErrors: {
                customerId: "",
                firstName: "",
                lastName: "",
                phoneNo: Number,
                email: ""
            }

        }
    }





    handleInputChange = (e) => {
        // validaons
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "customerId":
                formErrors.customerId =
                    value.length < 5 || value.length > 7
                        ? "CID number should have charactor between 5 to 7"
                        : "";
                break;

            case "firstName":
                formErrors.firstName =
                    value.length < 3
                        ? "Minimum charchter must be 3"
                        : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3
                        ? "Minimum charchter must be 3"
                        : "";
                break;
            case "phoneNo":
                formErrors.phoneNo =
                    value.length < 10 || value.length > 10
                        ? "Please enter a valid phone number"
                        : "";
                break;
            case "email":
                formErrors.email = invoiceRegx.test(value)
                    ? ""
                    : "Enter a valid email";
                break;

            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (formValid(this.state.formErrors)) {


            const { customerId, firstName, lastName, address, phoneNo, email } = this.state;

            const data = {
                customerId: customerId,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNo: phoneNo,
                email: email,

            }
            console.log(data)
            axios.post("http://localhost:8000/customer/add", data).then((res) => {
                if (res.data.success) {
                    toast(`New Customer Added`, {
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
        }
        else {
            toast(`😀 Plaese fill out the field. `, {
                type: toast.TYPE.ERROR,
                autoClose: 4000
            });

        }
    };

    render() {
        const { formErrors } = this.state;

        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col position-relative link">
                        <p><Link to="/Customer_Home">Customer Home</Link> {'>'} Add New Customer </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9 position-relative">
                        <h1 className='display-5 fw-bold'>Add New Customer </h1>
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
                                <label style={{ marginBottom: '5px' }}>Customer Id</label>
                                <input type="text"
                                    className="form-control"
                                    name="customerId"
                                    minLength="4"
                                    maxLength="7"
                                    placeholder="CID0001"
                                    value={this.state.customerId}
                                    onChange={this.handleInputChange} />
                                {formErrors.customerId.length < 5 || formErrors.customerId.length > 7 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.customerId}</span>
                                )}
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

                                {formErrors.firstName.length > 3 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.firstName}</span>
                                )}

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

                                {formErrors.lastName.length > 3 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.lastName}</span>
                                )}

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

                                {formErrors.phoneNo.length < 10 || formErrors.phoneNo.length > 10 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.phoneNo}</span>
                                )}


                            </div>


                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Email</label>
                                <input type="email"
                                    className={"form-control"}
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                                {formErrors.email.length > 0 && (
                                    <span style={{ color: 'red', fontWeight: 'bold' }} className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>






                            <center>
                                <div class="d-grid gap-2 col-6 mx-auto  ">
                                    <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Add</button>
                                </div>
                            </center>
                        </form>
                    </div>
                    <div className="col-3" />
                </div>
            </div>

        );
    };
};