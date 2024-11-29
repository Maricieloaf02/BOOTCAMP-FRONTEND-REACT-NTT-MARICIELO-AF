// el proyecto no ejecuta con la rama react-implementaci'on
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ShopPage from '@/pages/ShopPage';
import CartPage from '@/pages/CartPage';
import CheckoutDetailsPage from '@/pages/CheckoutDetailsPage';
import ErrorModal from '@/shared/components/ErrorModal';
import OrderCompletePage from './pages/OrderCompletePage';

const App: React.FC = () => {
  // usemos enum para las rutas
  return (
    <div>
      <ErrorModal />
      <Routes>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutDetailsPage />} />
        <Route path="*" element={<Navigate to="/shop" />} />
        <Route path="/order-complete" element={<OrderCompletePage />} />
      </Routes>
    </div>
  );
};

export default App;
