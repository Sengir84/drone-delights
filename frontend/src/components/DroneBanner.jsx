import './DroneBanner.css'
import drone from '../assets/Img/drone.png'

const DroneBanner = () => {
  return (
    <div className="drone-banner">
      <img src={drone} alt="Drone delivery" className="drone-img" />
        <div className='drone-text-box'>
          <span className="drone-text">Green Deliveries <br /> For A Better Tomorrow</span>
        </div>
    </div>
  );
}

export default DroneBanner;