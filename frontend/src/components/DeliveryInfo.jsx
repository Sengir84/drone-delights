import "./DeliveryInfo.css";


const DeliveryInfo = ({ userData }) => (
  <>
  <div className="delivery-inputs">
    <h2>Delivery</h2>
    <div>
    <label>First name:</label>
    <input type="text" defaultValue={userData?.firstName} placeholder="First Name" required />
    </div>
    <div>
    <label>Last name:</label>
    <input type="text" defaultValue={userData?.lastName} placeholder="Last Name" required />
    </div>
    <div>
    <label>Adress</label>
    <input type="text" defaultValue={userData?.address?.street} placeholder="Adress" required />
    </div>
  <div>
    <label>City</label>
    <input type="text" defaultValue={userData?.address?.city} placeholder="City" required />
    </div>
  <div>
    <label>ZIP</label>
    <input type="text" defaultValue={userData?.address?.zip} placeholder="Zipcode" required />
    </div>
  <div>
    <label>Phone</label>
    <input type="tel" defaultValue={userData?.phone} placeholder="Phone" required />
  </div>
  </div>
  </>
  
);
export default DeliveryInfo;