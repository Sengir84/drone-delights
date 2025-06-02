import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Cart from '../components/Cart';
import './Layout.css';
import { useState } from 'react';

function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="layout">
      <Header openCart={() => setIsCartOpen(true)} />

      <main className="content">
        <Outlet />
      </main>

      <Footer />

      
    {isCartOpen && (
      <div className="cart-popup-overlay" onClick={() => setIsCartOpen(false)}>
        <div
        className="cart-popup"
        onClick={(e) => e.stopPropagation()}
        >
      <button className="close-button" onClick={() => setIsCartOpen(false)}>✖</button>
      <Cart onClose={() => setIsCartOpen(false)} />
    </div>
  </div>
      )}
    </div>
  );
}

export default Layout;