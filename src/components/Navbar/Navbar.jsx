import React from "react";
import logo from "./images/GenieCart_Teal.png";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="container-lg container-fluid py-2 fixed-top bg-white">
      <nav className={`navbar`}>
        <div
          className={`${styles.logo} navbar-brand`}
          onClick={() => navigate("/")}
        >
          <img src={logo} height="30px" alt="GenieCart" />
        </div>
        <div className="d-flex justify-content-center gap-3">
          <button
            className={`${styles.login}`}
            type="submit"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className={`${styles.register}`}
            type="submit"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
