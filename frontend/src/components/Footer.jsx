import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Drone Delights. All rights reserved.
      
    </footer>
  );
};

export default Footer;