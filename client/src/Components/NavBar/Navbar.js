import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
       
      <nav className='navbar'>
        <div className='navbar-container'>
        
         
        <img className="logo-image" style={{ maxWidth: '80px', marginRight:'320px' }} src="../images/newlogo.png" />
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/Customer_Home' className='nav-links' onClick={closeMobileMenu}>
              Customer
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Room_Home'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Rooms
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/get_Emp'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Employees
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/supplier'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Suppliers
                
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/stock'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Inventory
                
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Salary
                
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/event_Home'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Event
                
              </Link>
            </li>
            
          
            
          
          </ul>
        
        </div>
      </nav>
    </>
  );
}

export default Navbar;
