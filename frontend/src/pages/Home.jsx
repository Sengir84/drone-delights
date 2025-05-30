import './Home.css';
import heroImg from '../assets/Img/hero.png';
import PopularDishes from '../components/PopularDishes';
import { useNavigate } from 'react-router-dom';
import DroneBanner from '../components/DroneBanner';
import HeroBanner from '../components/HeroBanner';

function Home() {

    const navigate = useNavigate();


    return (
        <div className="home-page">
            <HeroBanner/>
            

            <PopularDishes />
            
            <div className="menu-button-wrapper">
            <button id='menu-button' onClick={() => navigate('/menu')}>SEE OUR FULL MENU</button>
            </div>
            <DroneBanner />
        </div>
    )
}

export default Home;