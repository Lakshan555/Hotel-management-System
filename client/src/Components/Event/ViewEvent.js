import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import './estyle.css';


export default class ViewEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: [],
 
    };
  }

  getDate = () => {
    var wDate = new Date().toDateString();
    this.setState({ wDate });
  };
  //export PDF

  exportPDF = () => {
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4

    const marginLeft = 40;
    const doc = new jsPDF('landscape', unit, size);

    doc.setFontSize(15);

    const title = "Wedding Details";
    const headers = [['Booking ID', 'Groom"s Name', 'Bride Name', 'Wedding Date', 'Hall Type', 'No Of Guest' ,'Per Head Cost','Total Cost']];

    const data = this.state.event.map(elt => [elt.Bid, elt.Gname,elt.Bname, elt.wDate, elt.hType, elt.guest, elt.cost,elt.guest * elt.cost]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Wedding.pdf")
  }


  componentDidMount() {
    this.retrieveEvent();
    this.getDate();
  }

  retrieveEvent() {
    axios.get(`http://localhost:8000/event`).then(res => {
      if (res.data.success) {
        this.setState({
          event: res.data.existingEvent
        });
        console.log(this.state.event);

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
          axios.delete(`http://localhost:8000/event/delete/${id}`).then((res) => {

            swl('Event Deleted successfully', {
              icon: "success",
            });
            this.retrieveEvent();
          })
        }
      });
  }


  filterData(event, searchKey) {
    const result = event.filter((event) =>
      event.Bid.toLowerCase().includes(searchKey) ||
      event.Gname.toLowerCase().includes(searchKey) ||
      event.wDate.includes(searchKey) ||
      event.hType.toLowerCase().includes(searchKey) 
      
    )
    this.setState({ event: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/event").then(res => {
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
                <p>View Weddings</p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className='display-5 fw-bold'>Wedding Details</h1>
                < ToastContainer />
              </div>
              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>
            <div className="row">
              
              <div className="col-2 buttons">
                <Link to="/Event-Add" type="button" class="btn button_add2"><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Event</Link><br /><br />
              </div>
              <div className="col-3 buttons2">
                <Link onClick={()=>this.exportPDF()}  class="button_pdf"  ><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
              </div>
              <div className="col-2" />
              <div className="col-3 search position-relative" style={{ marginTop: '20px', marginLeft:"210px" }}>

                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an Event" name="searchQuery" onChange={this.handleSearchArea} />

              </div>
            </div>
            <div className="shadowBox">
              <div className="row">
                <div className="col-12 ">
                  <table class="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">BID</th>
                        <th scope="col">Groom's Name</th>
                        <th scope="col">Bride's Name</th>
                        <th scope="col">Wedding Date</th>
                        <th scope="col">Hall Type</th>
                        <th scope="col">No of Guest</th>
                        <th scope="col">Head Cost</th>
                        <th scope="col">Toatl cost</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {this.state.event.map((event, index) => (
                      <tbody>
                        <tr>
                          <th scope="row"><a href="" style={{ textDecoration: 'none', color: '#000' }}></a>{index + 1}</th>
                          <td>{event.Bid}</td>
                          <td>{event.Gname}</td>
                          <td>{event.Bname}</td>
                          <td>{event.wDate}</td>
                          <td>{event.hType}</td>
                          <td>{event.guest}</td>
                          <td>{event.cost}</td>
                          <td>{event.guest*event.cost}</td>
                          <td>
                            <Link to={`/event_update/${event._id}`} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
                              <i class="far fa-edit"></i>&nbsp;Edit
                            </Link>&nbsp;&nbsp;
                            <Link to="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(event._id)}>
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
