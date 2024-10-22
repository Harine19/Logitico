import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { SignInButton } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <span className="text-bolder">Logitico</span>
        </Link>

        {/* Navbar Toggler (for mobile views) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/book" className="nav-link">
                Book a Ride
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tracking" className="nav-link">
                Track Vehicle
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fleet" className="nav-link">
                Fleet Management
              </Link>
            </li>
          </ul>

        </div>
        <div className="d-flex">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link to="/sign-in"><button type="button" className="btn btn-primary">Sign in</button></Link>
            )}
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
