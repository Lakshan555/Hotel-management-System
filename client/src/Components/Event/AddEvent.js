import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Bid: "",
            Gname: "",
            Bname: "",
            wDate: new Date(),
            hType: "",
            guest: Number,
            cost: Number,
            total: Number,


            formErrors: {
                Bid: "",
                Gname: "",
                Bname: "",
                wDate: new Date(),
                hType: "",
                guest: Number,
                cost: Number,
               

            }

        }
    }

    handleInputChange = (e) => {

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "Bid":
                formErrors.Bid =
                    value.length < 5 || value.length > 6
                        ? "Emp number should have charactor between 4 to 5"
                        : "";
                break;
            case "Gname":
                formErrors.Gname =
                    value.length < 5
                        ? "Minimum charactor length must be 5"
                        : "";
                break;
            case "Bname":
                formErrors.Bname =
                    value.length < 5
                        ? "Minimum charactor length must be 5"
                        : "";
                break;
            case "guest":
                formErrors.guest =
                    value < 0
                        ? "Your are entering negative value !"
                        : "";
                break;
            case "cost":
                formErrors.cost =
                    value < 0
                        ? "Your are entering negative value !"
                        : "";
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


            const { Bid, Gname, Bname, wDate, hType, guest, cost,  } = this.state;

            const data = {
                Bid: Bid,
                Gname: Gname,
                Bname: Bname,
                wDate: wDate,
                hType: hType,
                guest: guest,
                cost: cost,
                total: guest * cost
            }
            console.log(data)
            axios.post("http://localhost:8000/event/add", data).then((res) => {
                if (res.data.success) {
                    toast(`New Event Added Successfully `, {
                        type: toast.TYPE.SUCCESS,
                        autoClose: 4000
                    });
                    this.setState(
                        {
                            Bid: "",
                            Gname: "",
                            Bname: "",
                            wDate: "",
                            hType: Number,
                            guest: "",
                            cost: Number,
                            total: "",
                        }
                    )
                };
            });
        }
        else {
            toast(`You are Inserting a blank! `, {
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
                        <p><Link to="/get_Emp">Weddings</Link> {'>'} Add New </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9 position-relative">
                        <h1 className='display-5 fw-bold'>Add New </h1>
                        < ToastContainer />
                    </div>
                    <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>
                <div className="row ">
                    <div className="col-3" />
                    <div className="col-6 shadowBox" >
                        <form>
                            {/* Booking ID */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Booking ID</label>
                                <input type="text"
                                    className="form-control"
                                    name="Bid"
                                    minLength="4"
                                    maxLength="6"
                                    placeholder="BID0001"
                                    value={this.state.Bid}
                                    onChange={this.handleInputChange} />
                                {formErrors.Bid.length < 4 || formErrors.Bid.length > 6 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.Bid}</span>
                                )}
                            </div>
                            {/* Groom's Name */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Groom's Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="Gname"
                                    placeholder="Enter Groom's Name"
                                    value={this.state.Gname}
                                    onChange={this.handleInputChange} />

                                {formErrors.Gname.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.Gname}</span>
                                )}

                            </div>
                            {/* Bride's Name */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Bride's Name</label>
                                <input type="Bname"
                                    className={"form-control"}
                                    name="Bname"
                                    placeholder="Enter Bride's Name"
                                    value={this.state.Bname}
                                    onChange={this.handleInputChange} />
                                {formErrors.Bname.length > 0 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.Bname}</span>
                                )}
                            </div>

                            {/* Wedding Date */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Wedding Date</label>
                                <input type="date"
                                    className="form-control"
                                    name="wDate"
                                    value={this.state.wDate}
                                    onChange={this.handleInputChange} />
                            </div>
                            
                            {/* Hall Type */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label for="hType"> Hall Type : </label>
                                <select id="hType" className="form-control" name="hType" onChange={this.handleInputChange} value={this.state.hType} required>
                                    <option selected>Choose type...</option>
                                    <option value="Lotus Room">Lotus Room</option>
                                    <option value="Galaxy Room">Galaxy Room</option>
                                    <option value="Ball Room">Ball Room</option>

                                </select>

                            </div>
                            {/* Number Of Guest */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Number Of Guest:</label>
                                <input type="number"
                                    className="form-control"
                                    name="guest"
                                    placeholder="Enter Number Of Guest"
                                    value={this.state.guest}
                                    onChange={this.handleInputChange} />
                                {formErrors.guest < 0 || (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.guest}</span>
                                )}
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Per Head Cost:</label>
                                <input type="number"
                                    className="form-control"
                                    name="cost"
                                    placeholder="Enter Per Head Cost"
                                    value={this.state.cost}
                                    onChange={this.handleInputChange} />
                                {formErrors.cost < 0 || (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.cost}</span>
                                )}
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Total Cost:</label>
                                <input type="number"
                                    className="form-control"
                                    name="total"
                                   readOnly
                                    value={this.state.guest * this.state.cost}
                                    onChange={this.handleInputChange}
                                  
                                     />
                                
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