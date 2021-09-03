import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './Components/NavBar/Navbar';

import Home from './Components/Employee/Home';
import AddEmployee from './Components/Employee/AddEmployee';
import UpdateEmployee from './Components/Employee/UpdateEmployee';


import AttendHome from './Components/EmployeeAttendance/AttendHome';



import ViewSuppliers from './Components/Supplier/ViewSuppliers';
import AddSupplier from './Components/Supplier/AddSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import ViewSupplierOrders from './Components/SupplierOrder/ViewSupplierOrders';
import AddSupplierOrder from './Components/SupplierOrder/AddSupplierOrder';
import SendEmail from './Components/SupplierOrder/SendEmail';


import ViewStock from './Components/Stock/ViewStocks';
import AddStock from './Components/Stock/AddStock';
import UpdateStock from './Components/Stock/UpdateStock';


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
         


           {/*Supplier*/}
          <Route path="/email" component={SendEmail}></Route>
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
          <Route exact path='/supplier-orders'>
            <ViewSupplierOrders />
          </Route>
          <Route exact path='/new-supplier-order'>
            <AddSupplierOrder />
          </Route>
          
          {/*Stock*/}
          <Route exact path='/stock'>
            <ViewStock />
          </Route>
          <Route exact path='/add-new-stock'>
            <AddStock />
          </Route>
          <Route exact path='/update-stock/:id'>
            <UpdateStock />
          </Route>
       
        </div>
       
      
      </BrowserRouter>
      
    )
  }
}
