import React, { Component } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';


export default class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            nic: "",
            mobileNo: Number,
            designation: "",
            department: "",

            formErrors:{
                name:"",
                email: "",
                nic: "",
                mobileNo: Number,
                designation: "",
                department: "",

            }

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
        const { name, email, nic, mobileNo, designation, department } = this.state;

        const data = {
            name: name,
            email: email,
            nic: nic,
            mobileNo: mobileNo,
            designation: designation,
            department: department
        }
        console.log(data)
        axios.put(`http://localhost:8000/employee/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast(`Employee Updated`, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        name: "",
                        email: "",
                        nic: "",
                        mobileNo:Number,
                        designation: "",
                        department: ""
                    }
                )
            };
        });
   
    
    };
    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/employee/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: res.data.employee.name,
                    email: res.data.employee.email,
                    nic: res.data.employee.nic,
                    mobileNo: res.data.employee.mobileNo,
                    designation: res.data.employee.designation,
                    department: res.data.employee.department,

                });
                console.log(this.state.employee);
            }
        })
    }






    render() {
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <img className="order_img" src="../images/eupdate.png" />
                    </div>
                    <div className="col-6 shadowBox" >
                        <center>

                            <h1 className="h3 mb-3 font-weight-normal">Update Employee</h1>
                        </center>
                        <form className="needs-validation" noValidate>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Employee Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Employee Name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    required />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Email</label>
                                <input type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} 
                                    required/>
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>NIC</label>
                                <input type="text"
                                    className="form-control"
                                    name="nic"
                                    placeholder="Enter NIC"
                                    value={this.state.nic}
                                    onChange={this.handleInputChange} 
                                    required/>
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Mobile No</label>
                                <input type="text"
                                    maxLength= "10"
                                    minLength = "10"
                                    className="form-control"
                                    name="mobileNo"
                                    placeholder="mobileNo"
                                    value={this.state.mobileNo}
                                    onChange={this.handleInputChange} 
                                    required/>
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Designation</label>
                                <input type="text"
                                    className="form-control"
                                    name="designation"
                                    placeholder="Enter Payment Date"
                                    value={this.state.designation}
                                    onChange={this.handleInputChange} 
                                    required/>
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Department</label>
                                <select type="text"
                                    className="form-control"
                                    name="department"
                                    placeholder="Select Department"

                                    value={this.state.department}
                                    onChange={this.handleInputChange} >
                                        <option selected>{this.state.department}</option>
                                        <option values="Marketing_Dep">Marketing Dep</option>
                                        <option values="Arrangments_Dep">Arrangments Dep</option>
                                        <option values="Finance_Dep">Finance Dep</option>
                                        <option values="Kitchen_Dep">Kitchen Dep</option>
                                        </select>

                            </div>


                            <center>
                                <div class="d-grid gap-2 col-6 mx-auto">
                                    <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Update</button>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}