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
         <nav className='navbar2'>
        <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img className="logo-image" style={{ maxWidth: '100px', marginRight:'500px' }} src="../images/logo3.png" />
          
           
          </Link>
          <h2>HOTELOPS</h2>
          <p className='slogen-p'>Service With a smille</p>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
          
          </ul>
        
        </div>
      </nav>
      <nav className='navbar'>
        <div className='navbar-container'>
        
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Customer
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
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
                to='/products'
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
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Expenses
                
              </Link>
            </li>
            
          
            
          
          </ul>
        
        </div>
      </nav>
    </>
  );
}

export default Navbar;
