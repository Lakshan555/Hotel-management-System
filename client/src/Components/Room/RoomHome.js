import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import './estyle.css';


export default class RoomHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: [],
 
    };
  }

 
  //export PDF

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4

    const marginLeft = 40;
    const doc = new jsPDF('landscape', unit, size);

    doc.setFontSize(15);

    const title = "Room Details";
    const headers = [['Room Number', 'Type', 'Number of beds', 'Price', 'Description', 'Availability']];

    const data = this.state.room.map(Rld => [Rld.roomNo, Rld.type,Rld.noOfBeds, Rld.price, Rld.description, Rld.availability]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Rooms.pdf")
  }


  componentDidMount() {
    this.retrieveRoom();
    
  }

  retrieveRoom() {
    axios.get(`http://localhost:8000/room`).then(res => {
      if (res.data.success) {
        this.setState({
          room: res.data.existingEvent
        });
        console.log(this.state.room);

      }

    });
  }

  //delete function with confirmation
  onDelete = (id) => {
    swl({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8000/room/delete/${id}`).then((res) => {

            swl('Room Deleted successfully', {
              icon: "success",
            });
            this.retrieveRoom();
          })
        }
      });
  }


  filterData(room, searchKey) {
    const result = room.filter((room) =>
      room.roomNo.toLowerCase().includes(searchKey) ||
      room.type.toLowerCase().includes(searchKey) ||
      room.description.includes(searchKey) ||
      room.availability.toLowerCase().includes(searchKey) 
      
    )
    this.setState({ room: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/room").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingEvent, searchKey)
      }
    });
  }
  

  render() {
    return (
      <div className="container containerTop">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col position-relative link">
             
                
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className='display-5 fw-bold'>Room Details</h1>
                < ToastContainer />
              </div>
              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>
            <div className="row">
              
              <div className="col-2 buttons">
                <Link to="/Room-Add" type="button" class="btn button_add2"><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Room</Link><br /><br />
              </div>
              <div className="col-3 buttons2">
                <Link onClick={()=>this.exportPDF()}  class="button_pdf"  ><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
              </div>
              <div className="col-2" />
              <div className="col-3 search position-relative" style={{ marginTop: '20px', marginLeft:"210px" }}>

                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an Room" name="searchQuery" onChange={this.handleSearchArea} />

              </div>
            </div>
            <div className="shadowBox">
              <div className="row">
                <div className="col-12 ">
                  <table class="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Room Number</th>
                        <th scope="col">Type</th>
                        <th scope="col">No Of Beds</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Availability</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {this.state.room.map((room, index) => (
                      <tbody>
                        <tr>
                          <th scope="row"><a href="" style={{ textDecoration: 'none', color: '#000' }}></a>{index + 1}</th>
                          <td>{room.roomNo}</td>
                          <td>{room.type}</td>
                          <td>{room.noOfBeds}</td>
                          <td>{room.price}</td>
                          <td>{room.description}</td>
                          <td>{room.availability}</td>
                          <td>
                            <Link to={`/Room_update/${room._id}`} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
                              <i class="far fa-edit"></i>&nbsp;Edit
                            </Link>&nbsp;&nbsp;
                            <Link to="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(room._id)}>
                              <i className="far fa-trash-alt"></i>&nbsp;Delete
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
