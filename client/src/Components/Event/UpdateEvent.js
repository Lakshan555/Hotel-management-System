import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



export default class UpdateEvent extends Component {
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
        axios.put(`http://localhost:8000/event/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast(`Event Updated`, {
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

    };
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/event/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    Bid: res.data.event.Bid,
                    Gname: res.data.event.Gname,
                    Bname: res.data.event.Bname,
                    wDate: res.data.event.wDate,
                    hType: res.data.event.hType,
                    guest: res.data.event.guest,
                    cost: res.data.event.cost,
                    total: res.data.event.total,
                });
                console.log(this.state.event);
            }
        })
    }




    render() {
        return (
            <div className="container containerTop">
            <div className="row">
                <div className="col position-relative link">
                    <p><Link to="/get_Emp">Weddings</Link> {'>'} Add New </p>
                </div>
            </div>
            <div className="row">
                <div className="col-9 position-relative">
                    <h1 className='display-5 fw-bold'>Update Event</h1>
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
                            
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Per Head Cost:</label>
                            <input type="number"
                                className="form-control"
                                name="cost"
                                placeholder="Enter Per Head Cost"
                                value={this.state.cost}
                                onChange={this.handleInputChange} />
                           
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
                                <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Update</button>
                            </div>
                        </center>
                    </form>
                </div>
                <div className="col-3" />
            </div>
        </div>

        )
    }
}