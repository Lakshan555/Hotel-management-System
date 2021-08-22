
import React, {Component} from 'react';
import axios from 'axios';


export default class CreateRecord extends Component{
    constructor(props){
        super(props);
        this.state={
            empID:"",
            aTime: new Date(),
            type:""
        }
    }

    

    handleInputChange=(e)=>{
        const{name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        });
    };

    

    onSubmit = (e) =>{
    e.preventDefault();
    const {type,empID,aTime,password}=this.state;
    const data ={
        empID:empID,
                aTime:aTime,
                type:type
    }
    //console.log(data)
    axios.post("http://localhost:8000/attend/save",data).then((res)=>{
        if(res.data.success){
            alert("Mark Attendence successfully")
            this.setState(
                {
                    empID:"",
                    aTime:new Date(),
                    type:""
                }
            )
        };
    });
}


  retrieveEmployee(){
    axios.get(`http://localhost:8000/employee`).then(res=>{
    if(res.data.success){
        this.setState({
            employee:res.data.existingEmployee
        });
        console.log(this.state.employee);

    }
       
    });
}

    render(){
        return(
            <div className="col-md-8 mt-4 mx-auto" style={{
                borderRadius:'5px',
                backgroundColor:'#f2f2f2',
                padding: '20px',
                width: '40%',
                fontFamily:'sans-serif',
                boxShadow: '0 1px 56px -26px #000'
                
            }}
            
            >
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
            </div>
        );
    };
};
















