import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './Components/NavBar/Sidebar';

import Home from './Components/Employee/Home';
import AddEmployee from './Components/Employee/AddEmployee';
import UpdateEmployee from './Components/Employee/UpdateEmployee';
import GetSpecific from './Components/Employee/GetSpecific';



import CreateAttendance from './Components/CreateAttendance';
/*import CreateRecord from './Components/CreateRecord';
import EditRecord from './Components/EditRecord';
import RecordHome from './Components/RecordHome';*/
import EmpAttend from './Components/EmpAttend';
import SendEmail from './Components/SendEmail';


import ViewSuppliers from './Components/Supplier/ViewSuppliers';
import AddSupplier from './Components/Supplier/AddSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';
import ViewSupplierOrders from './Components/SupplierOrder/ViewSupplierOrders';
import AddSupplierOrder from './Components/SupplierOrder/AddSupplierOrder';
import UpdateSupplierOrder from './Components/SupplierOrder/UpdateSupplierOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Footer from './Components/Footer/Footer';
import AttendHome from './Components/AttendHome';



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
          <Route path="/attend_h" component={EmpAttend}></Route>

         
          <Route exact path='/supplier'>
            <ViewSuppliers />
          </Route>
          <Route exact path='/add-new-supplier'>
            <AddSupplier />
          </Route>
          <Route exact path='/update-supplier/:id'>
            <UpdateSupplier />
          </Route>
          <Route exact path='/supplier-orders'>
            <ViewSupplierOrders />
          </Route>
          <Route exact path='/new-supplier-order'>
            <AddSupplierOrder />
          </Route>
          <Route exact path='/update-supplier-order/:id'>
            <UpdateSupplierOrder />
          </Route>
          <Route path="/attend_home" component={AttendHome}></Route>



       
        </div>
       
        <Footer/>
      </BrowserRouter>
      
    )
  }
}
