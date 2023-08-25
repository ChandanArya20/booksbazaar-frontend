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
import UserOrderPage from "./pages/UserOrderPage";
import AddressFormPage from "./pages/AddressFormPage";
import AddressSelectorPage from "./pages/AddressSelectorPage";
import OrderItemDetailsPage from "./pages/OrderItemDetailsPage";
import AddressItem from "./components/AddressItem";
import AddressContinue from "./pages/AddressContinue";
import SellerOrderItemDetailsPage from "./pages/SellerOrderItemDetailsPage";
import SellerOrderPage from "./pages/SellerOrderPage";
import DeliveryStatusModel from "./components/DeliveryStatusModel";
import CategoryResultPage from "./pages/CategoryResultPage";
import SearchResultPage from "./pages/SearchResultPage";

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
        <Route path="/addressItem" element={<AddressItem/>} />
        {/* <Route path="/orderItem" element={<OrderItem/>} /> */}
        <Route path="/userOrderPage" element={<UserOrderPage/>} />
        <Route path="/addressFormPage" element={<AddressFormPage />} />
        <Route path="/addressSelectorPage" element={<AddressSelectorPage />} />
        <Route path="/orderItemDetailsPage" element={<OrderItemDetailsPage />} />
        <Route path="/addressContinue" element={<AddressContinue />} />
        <Route path="/sellerOrderPage" element={<SellerOrderPage />} />
        <Route path="/sellerOrderItemDetailsPage" element={<SellerOrderItemDetailsPage />} />
        <Route path="/deliveryStatusModel" element={<DeliveryStatusModel />} />
        <Route path="/categoryResultPage" element={<CategoryResultPage />} />
        <Route path="/searchResultPage" element={<SearchResultPage />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/comingFeature" element={<UpcomingFeature />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
