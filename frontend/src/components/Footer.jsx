import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Drone Delights. All rights reserved.
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;