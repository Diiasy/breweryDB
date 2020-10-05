import React from 'react';
import '../layouts/Navbar.css';
import { Link } from 'react-router-dom';
import { Navbar } from "react-bootstrap";

function NavbarApp() {
  return (
    <Navbar collapseOnSelect expand="md" variant="light" className="navbar-style">
        <div className="container-fluid nav">
          <div className="brand">
            <Link className="nav-link navbar-icon img-fluid" to='/'>
              <img  src="https://i.pinimg.com/originals/c6/1c/a5/c61ca5bebd5fac190227f602ab0d6fe8.png" alt="Beer" />
            </Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="collapse navbar-collapse nav-list" id="responsive-navbar-nav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link p-2" to='/properties'>Per country</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link p-2" to='/map'>Per type</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link p-2" to='/search'>Search a beer</Link>
                </li>
              </ul>
              
            </Navbar.Collapse>
        </div>
      </Navbar>
  )
}

export default NavbarApp;