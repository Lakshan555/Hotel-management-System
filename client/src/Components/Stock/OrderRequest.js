import React, { Component, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'


export default function AppEmail() {

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('gmail', 'template_gfvmy09', e.target, 'user_YittnvkqIC29ALCvWV62s')
      .then((result) => {
        console.log(result.text);
        alert("You email is sent successfully");
      }, (error) => {
        console.log(error.text);
        alert("Check your details again");
      });
  }

  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('Valid Email')
    } else {
      setEmailError('Enter valid Email')
    }
  }

  return (
<div className="container containerTop">
<div className="row">
					<div className="col-12">
						<div className="row">
							<div className="col position-relative link">
                <p><Link to="/stock">Stock Management</Link> {'>'} Order Request</p>
							</div>
						</div>
						<div className="row">
							<div className="col-9 position-relative">
								<h1 className='display-5 fw-bold'>Order Request</h1>
								< ToastContainer />
							</div>
							<hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
						</div>
					</div>
				</div>

    <div class="row">
      <div className="col-md-3" />
      <div className="col-md-6">
        <div className="shadowBox">
            <div className="row" style={{textAlign:'center'}}>
              <h1 className="h3 mb-3 font-weight-normal">Order Request Information</h1>
            </div>          
          <div className="container">
            <div style={{ marginTop: "5%" }}>
              <form onSubmit={sendEmail}>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Item Id</label>
                  <input name="itemId" type="text" class="form-control" placeholder="IT0001" />
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Item Name</label>
                  <input name="itemName" type="text" class="form-control" placeholder="Item name" />
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Quantity</label>
                  <input name="qyt" type="Number" class="form-control" placeholder="100" />
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}> Requesting Date</label>
                  <input name="reqDate" type="date" class="form-control" placeholder="Item name" />
                </div>

                <div class="from-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Email Address</label>
                  <input name="email" type="email" class="form-control" placeholder="Enter Email" onChange={(e) => validateEmail(e)} />
                  <span style={{ color: 'red', }}>{emailError}</span>
                </div>


                {/* <div class="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Message</label>
                  <textarea name="message" class="form-control" placeholder="Enter Your Message"></textarea>
                </div> */}

                <div className="row">
                  <div className="col-3"/>
                  <div className="col-6" style={{textAlign:'center'}}>
                    <button type="submit" class="btn btn-primary sub_btn"><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;Send an Email</button>
                  </div>
                  <div className="col-3"/>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3" />
    </div>
    </div>    
  );
}
