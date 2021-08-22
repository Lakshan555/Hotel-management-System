import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css'

export default class EmpAttend extends Component{
    constructor(props){
        super(props);
        this.state={
            employee:[],
        }
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let a = parseInt(e.target.value)
        this.setState({
            [e.target.name]: a,
        })
      }

      componentDidMount(){
        this.retrieveEmployee();
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

    render() {
        return (
          <div className="container" >
            <div className="row">
              <div className="col-lg-9 mt-2 mb-2">
    
                </div>
               
    
            </div> 
                <div className="py-4">
                <h1>Employee Daily Attendence</h1>
                <table class=" table table-striped borde" >
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Date</th>
                        <th scope="col">Attendence</th>
                       
                      
                        
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.employee.map((employee,index)=> (
                          <tr key={index}>
                              <th scope="row">EMP{index + 1}</th>
                              <td>
                                 <a href={`/employee/${employee._id}`} style={{textDecoration:'none'}}>
                                  {employee.name}
                                </a>
                                </td>
                              <td>{employee.email}</td>
                              <td>{employee.designation}</td>
                              <td>{employee.date}</td>
                              <td><input type="number" max = "1" min="0" maxLength="1"/></td>
                             
                          </tr>
                        ))}
    
                    </tbody>
                    </table>
                   
                    
                    
     
                </div>
            </div>
        )
      }
}