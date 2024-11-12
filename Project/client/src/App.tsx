import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RestaurantPage from './pages/restaurantPage';
import DeliveryPage from './pages/deliveryPage';
import AdminPage from './pages/adminPage';
import CustomerPage from './pages/customerPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
