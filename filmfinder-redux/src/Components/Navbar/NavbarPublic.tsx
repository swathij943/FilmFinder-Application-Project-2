import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarPublic.css";
import logo from "../../Assets/FFLogo.png";

export const NavbarPublic: React.FC = () => {
  const navigator = useNavigate();

  const handleRegisterNavigate = () => {
    navigator("/register");
  };

  const handleLoginNavigate = () => {
    navigator("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <h2>
          <Link to={"/"} className="logo">
            <img className="logo-icon" src={logo}></img>
            Film<span>Finder</span>
          </Link>
        </h2>

        <div className="join-box">
          <p className="join-msg">The best movies on the web</p>
          <button className="btn join-btn" onClick={handleRegisterNavigate}>
            Join Now
          </button>
          <button className="btn" onClick={handleLoginNavigate}>
            Sign In
          </button>
        </div>
      </nav>
    </div>
  );
};
