import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src="/logo1_transparent.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>HOME</Link>
          </li>
          {isAuthorized ? (
            <>
              <li>
                <Link to="/job/getall" onClick={() => setShow(false)}>FIND PROJECTS</Link>
              </li>
              <li>
                <Link to="/applications/me" onClick={() => setShow(false)}>
                  {user && user.role === "Client" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
                </Link>
              </li>
              {user && user.role === "Client" && (
                <>
                  <li>
                    <Link to="/job/post" onClick={() => setShow(false)}>POST A PROJECT</Link>
                  </li>
                  <li>
                    <Link to="/job/me" onClick={() => setShow(false)}>MY PROJECTS</Link>
                  </li>
                </>
              )}
              <button onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setShow(false)}>LOGIN</Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setShow(false)}>REGISTER</Link>
              </li>
            </>
          )}
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
