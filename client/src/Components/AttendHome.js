import React, {Component} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'

export default class AttendHome extends Component{
  constructor(props){
    super(props);
    this.state={
      attends:[]
    };
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
  
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
  
    const title = "Employee Attendence";
    const headers = [['Employee ID','Attend Type','Date & Time']];
  
    const data = this.state.attends.map(elt=> [elt.empID,elt.type,elt.aTime]);
  
    let content = {
      startY: 50,
      head: headers,
      body: data
    };
  
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Attendence_List.pdf")
  }

  componentDidMount(){
    this.retrieveAttendence();
  }

  retrieveAttendence(){
    axios.get("http://localhost:8000/attends").then(res =>{
      if(res.data.success){
        this.setState({
          attends:res.data.existingAttends
        });
        console.log(this.state.attends)
      }
    });
  }

 onDelete=(id)=>{
   axios.delete(`http://localhost:8000/attends/delete/${id}`).then((res)=>{
     alert("Record Deleted");
     this.retrieveAttendence();
   })
 }

filterData(attends,searchKey){
  const result=attends.filter((attends)=>
  attends.empID.toUpperCase().includes(searchKey)||
  attends.type.toUpperCase().includes(searchKey)||
  attends.aTime.toLowerCase().includes(searchKey)
  )
  this.setState({attends:result})
}


handleSearchArea=(e)=>{
  const searchKey=e.currentTarget.value;
  axios.get("http://localhost:8000/attends").then(res =>{
    if(res.data.success){
      this.filterData(res.data.existingAttends,searchKey)
    }
  });

}
  render(){
    return(
      <div className="container" width="50%">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>Attendence List</h4>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              <input
              className="form-control"
              type="search"
              placeholder="search"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

            </div>

        </div>
        
      <div>
        <div>
        <table className="table border shadow ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Employ ID</th>
      <th scope="col">Attend Type</th>
      <th scope="col">Date and Time</th>
      <th scope="col">  </th>
   
    </tr>
  </thead>
  <tbody>
  {this.state.attends.map((attends,index)=>(
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td><a href={`/record/${attends._id}`} style={{textDecoration:'none'}}>{attends.empID}</a></td>
        <td>{attends.type}</td>
        <td>{attends.aTime}</td>
         <td>
          <Link className ="btn btn-danger" href="#" onClick={()=>this.onDelete(attends._id)}>
          <i className="fas fa-trash-alt"></i>&nbsp;Delete
          </Link>
          </td> 
      </tr>
  ))}
   </tbody>   
</table>
        </div>
        <div>
        <form>
          {/* form*/}
          <center><h1 className="h3 mb-3 font-weight-normal">Attendence</h1></center>
          <form onSubmit={this.onSubmit} >
                <div className="form-group col-4 position-relative" style={{marginTop:'15px'}}>
	            <label for="type"> Attendance Type : </label>
	            <select id="type" className="form-control" name="type" onChange={this.handleInputChange} value={this.state.type} required>
                    <option value="">--</option>
                    <option value="IN">IN</option>
 		            <option value="OUT">OUT</option>
	            </select>       
                </div>      

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Select Date and Time</label>
                <input type="datetime-local"
                className="form-control"
                name="aTime"
                value={this.state.aTime}
                onChange={this.handleInputChange} />
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Employee ID</label>

                
                

                <input type="text"
                className="form-control"
                name="empID"
                value={this.state.empID}
                onChange={this.handleInputChange} required/>
                </div>

              
            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </form>
        </form>
        </div>
      </div>

<Link to="/attend" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Attend</Link>&nbsp;
<Link onClick={()=>this.exportPDF()} to="#" className="btn btn-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link>
      </div>

    )
  }
};