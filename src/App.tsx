import { Navigate, Route, Routes } from "react-router-dom";
import { restaurants } from "./data/mock";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { MenuPage } from "./pages/MenuPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/r/${restaurants[0].slug}`} replace />} />
      <Route path="/r/:slug" element={<MenuPage />} />
      <Route path="/r/:slug/cart" element={<CartPage />} />
      <Route path="/r/:slug/checkout" element={<CheckoutPage />} />
      <Route path="/r/:slug/order-confirmation/:id" element={<OrderConfirmationPage />} />
    </Routes>
  );
}
