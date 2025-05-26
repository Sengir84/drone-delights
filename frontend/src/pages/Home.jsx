import './Home.css';
import heroImg from '../assets/Img/hero.png';

function Home() {
    return (
        <div className="home-page">
            <div className='hero-container'>
                <img id="hero-img" src={heroImg} alt="Hero" />
                <h1 id='heroimg-text'>Flavors of the world at your fingertips</h1>
            </div>
            <h1>Startsida</h1>
        </div>
    )
}

export default Home;