import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class EventHome extends Component {
    render() {
        return (
            <div className="container containerTop">
            <div className="row heading">
                <div className="col">
                    <h3>Event Management</h3>
                    <hr  style={{height:'3px' , color:'#0a90e8'}}/>
                </div>
            </div>
    
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-4 d-flex justify-content-center">
                        <div className="card" style={{width: '20rem'}}>
                            <img className="card-img-top" src="images/wedding.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Weddings</h5>
                               
                                <div className="view d-flex justify-content-center">
                                    <Link className="btn button btn-primary text-center" to="/get_event">View &raquo;</Link>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="col-4 d-flex justify-content-center">
                        <div className="card" style={{width: '20rem'}}>
                            <img className="card-img-top" src="images/meetingroom.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Meeting Rooms</h5>
                               
                                <div className="view d-flex justify-content-center">
                                    <Link className="btn button btn-primary text-center" to="/">View &raquo;</Link>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="col-4 d-flex justify-content-center">
                        <div className="card" style={{width: '20rem'}}>
                            <img className="card-img-top" src="images/event.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Special Event</h5>
                               
                                <div className="view d-flex justify-content-center">
                                    <Link className="btn button btn-primary text-center" to="/">View &raquo;</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
