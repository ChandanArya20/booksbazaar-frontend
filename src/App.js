import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './components/CartPage';
import LoginWithEmailPage from './components/LoginWithEmailPage';
import LoginWithPhonePage from './components/LoginWithPhonePage';
import RegistrationPage from './components/RegistrationPage';
import PasswordCreationPage from './components/PasswordCreationPage';
import ErrorPage from './components/ErrorPage';
import UpcomingFeature from './components/UpcommingFeature';
import HomePage from "./components/HomePage";
import SellerPasswordCreationPage from "./components/SellerPasswordCreationPage";
import SellerRegistrationPage from "./components/SellerRegistrationPage";
import SellerLoginPage from "./components/SellerLoginPage";
import SellerDashboard from "./components/SelllerDashboard";
import BookAddSellerPage from "./pages/BookAddSellerPage";
import BookUpdateSellerPage from "./pages/BookUpdateSellerPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderItem from "./components/OrderItem";
import OrderPage from "./pages/OrderPage";
import AddressFormPage from "./pages/AddressFormPage";

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/emailLogin" element={<LoginWithEmailPage />} />
        <Route path="/phoneLogin" element={<LoginWithPhonePage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/passwordPage" element={<PasswordCreationPage />} />
        <Route path="/SellerSignup" element={<SellerRegistrationPage />} />
        <Route path="/sellerLogin" element={<SellerLoginPage />} />
        <Route path="/sellerPasswordPage" element={<SellerPasswordCreationPage />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/bookAddSellerPage" element={<BookAddSellerPage />} />
        <Route path="/bookUpdateSellerPage" element={<BookUpdateSellerPage />} />
        <Route path="/productDetailsPage" element={<ProductDetailsPage />} />
        <Route path="/orderSuccessPage" element={<OrderSuccessPage />} />
        <Route path="/orderItem" element={<OrderItem/>} />
        <Route path="/orderPage" element={<OrderPage/>} />
        <Route path="/orderPage" element={<OrderPage/>} />
        <Route path="/addressFormPage" element={<AddressFormPage />} />
        <Route path="/comingFeature" element={<UpcomingFeature />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
