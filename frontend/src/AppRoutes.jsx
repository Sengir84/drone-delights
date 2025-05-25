import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Alla sidor som använder Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
      
    </Routes>
  );
}