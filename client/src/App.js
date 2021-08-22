import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './Components/NavBar/Navbar';

import Home from './Components/Employee/Home';
import AddEmployee from './Components/Employee/AddEmployee';
import UpdateEmployee from './Components/Employee/UpdateEmployee';
import GetSpecific from './Components/Employee/GetSpecific';

import AttendHome from './Components/EmployeeAttendance/AttendHome';
import CreateAttendance from './Components/EmployeeAttendance/CreateAttendance';
import SendEmail from './Components/EmployeeAttendance/SendEmail';


import ViewSuppliers from './Components/Supplier/ViewSuppliers';
import AddSupplier from './Components/Supplier/AddSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';






export default class App extends Component {
  render() {
    return (
      
      <BrowserRouter>

        <NavBar />
        
        <ToastContainer />
        <div className="container">

          {/*Employee*/}
          <Route path="/get_Emp" exact component={Home}></Route>
          <Route path="/emp_add" exact component={AddEmployee}></Route>
          <Route path="/emp_update/:id" exact component={UpdateEmployee}></Route>
          <Route path="/employee/:id" exact component={GetSpecific}></Route>


          <Route path="/email" component={SendEmail}></Route>
          {/*<Route path="/get_R" exact component={RecordHome}></Route>
          <Route path="/add_R" component={CreateRecord}></Route>
          <Route path="/edit_R/:id" component={EditRecord}></Route>*/}
          <Route path="/attend" component={CreateAttendance}></Route>
         
         
          <Route exact path='/supplier'>
            <ViewSuppliers />
          </Route>
          <Route exact path='/add-new-supplier'>
            <AddSupplier />
          </Route>
          <Route exact path='/update-supplier/:id'>
            <UpdateSupplier />
          </Route>
         
          <Route path="/attend_home" component={AttendHome}></Route>



       
        </div>
       
      
      </BrowserRouter>
      
    )
  }
}
