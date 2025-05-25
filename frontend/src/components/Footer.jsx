import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Drone Delights. All rights reserved.
    </footer>
  );
};

export default Footer;