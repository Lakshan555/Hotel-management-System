import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import './estyle.css';


export default class CustomerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: [],
 
    };
  }

 
  //export PDF

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4

    const marginLeft = 40;
    const doc = new jsPDF('landscape', unit, size);

    doc.setFontSize(15);

    const title = "Customer Details";
    const headers = [['CustomerId', 'First Name', 'Last Name', 'Address', 'Phone No', 'Email']];

    const data = this.state.customer.map(Rld => [Rld.customerId, Rld.firstName,Rld.lastName, Rld.address, Rld.phoneNo, Rld.email]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Customer.pdf")
  }


  componentDidMount() {
    this.retrieveCustomer();
    
  }

  retrieveCustomer() {
    axios.get(`http://localhost:8000/customer`).then(res => {
      if (res.data.success) {
        this.setState({
          customer: res.data.existingCustomer
        });
        console.log(this.state.customer);

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
          axios.delete(`http://localhost:8000/customer/delete/${id}`).then((res) => {

            swl('customer Deleted successfully', {
              icon: "success",
            });
            this.retrieveCustomer();
          })
        }
      });
  }


  filterData(customer, searchKey) {
    const result = customer.filter((customer) =>
      customer.customerId.toLowerCase().includes(searchKey) ||
     customer.firstName.toLowerCase().includes(searchKey) ||
      customer.lastName.toLowerCase().includes(searchKey) 
    )
    this.setState({ customer: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/customer").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingCustomer, searchKey)
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
                <h1 className='display-5 fw-bold'>Customer Details</h1>
                < ToastContainer />
              </div>
              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>
            <div className="row">
              
              <div className="col-2 buttons">
                <Link to="/Customer-Add" type="button" class="btn button_add2"><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Customer</Link><br /><br />
              </div>
              <div className="col-3 buttons2">
                <Link onClick={()=>this.exportPDF()}  class="button_pdf"  ><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
              </div>
              <div className="col-2" />
              <div className="col-3 search position-relative" style={{ marginTop: '20px', marginLeft:"210px" }}>

                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an Customer" name="searchQuery" onChange={this.handleSearchArea} />

              </div>
            </div>
            <div className="shadowBox">
              <div className="row">
                <div className="col-12 ">
                  <table class="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">CustomerId</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {this.state.customer.map((customer, index) => (
                      <tbody>
                        <tr>
                          <th scope="row"><a href="" style={{ textDecoration: 'none', color: '#000' }}></a>{index + 1}</th>
                          <td>{customer.customerId}</td>
                          <td>{customer.firstName}</td>
                          <td>{customer.lastName}</td>
                          <td>{customer.address}</td>
                          <td>{customer.phoneNo}</td>
                          <td>{customer.email}</td>
                          <td>
                            <Link to={`/Customer_update/${customer._id}`} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
                              <i class="far fa-edit"></i>&nbsp;Edit
                            </Link>&nbsp;&nbsp;
                            <Link to="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(customer._id)}>
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
