import { Link } from "react-router-dom";
import routes from "../AppRoutes";
import "./Header.css";


function Header() {
  return (
    <header className="header">
      <h1>Drone Delights</h1>
      <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Header;