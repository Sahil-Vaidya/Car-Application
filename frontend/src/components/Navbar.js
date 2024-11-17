import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/">Login</Link>
    </nav>
  );
};

export default Navbar;
