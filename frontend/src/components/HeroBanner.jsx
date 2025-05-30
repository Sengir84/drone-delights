import './HeroBanner.css';
import heroImg from '../assets/Img/hero.png';

const HeroBanner = () => (
  <div className="hero-banner">
  <img src={heroImg} alt="Hero" id="hero-img" />
  <div className="hero-text-box">
    <h1 className="hero-text">Flavors of the world at your fingertips</h1>
  </div>
</div>
);

export default HeroBanner;