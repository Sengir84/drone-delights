const DeliveryInfo = ({ userData }) => (
  <>
    <h2>Delivery</h2>
    <input type="text" defaultValue={userData?.firstName} placeholder="Name" required />
    <input type="text" defaultValue={userData?.lastName} placeholder="Lastname" required />
    <input type="text" defaultValue={userData?.address?.street} placeholder="Adress" required />
    <input type="text" defaultValue={userData?.address?.city} placeholder="City" required />
    <input type="text" defaultValue={userData?.address?.zip} placeholder="Zipcode" required />
    <input type="tel" defaultValue={userData?.phone} placeholder="Phone" required />
  </>
);
export default DeliveryInfo;