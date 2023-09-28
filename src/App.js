import "./App.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import LoginWithEmailPage from './pages/LoginWithEmailPage';
import LoginWithPhonePage from './pages/LoginWithPhonePage';
import RegistrationPage from './pages/RegistrationPage';
import PasswordCreationPage from './pages/PasswordCreationPage';
import ErrorPage from './pages/ErrorPage';
import UpcomingFeature from './pages/UpcommingFeature';
import HomePage from "./pages/HomePage";
import SellerPasswordCreationPage from "./pages/SellerPasswordCreationPage";
import SellerRegistrationPage from "./pages/SellerRegistrationPage";
import SellerLoginPage from "./pages/SellerLoginPage";
import SellerDashboard from "./pages/SelllerDashboard";
import BookAddSellerPage from "./pages/BookAddSellerPage";
import BookUpdateSellerPage from "./pages/BookUpdateSellerPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import AddressFormPage from "./pages/AddressFormPage";
import AddressSelectorPage from "./pages/AddressSelectorPage";
import OrderItemDetailsPage from "./pages/OrderItemDetailsPage";
import AddressContinue from "./pages/AddressContinue";
import SellerOrderItemDetailsPage from "./pages/SellerOrderItemDetailsPage";
import SellerOrderPage from "./pages/SellerOrderPage";
import CategoryResultPage from "./pages/CategoryResultPage";
import SearchResultPage from "./pages/SearchResultPage";

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/userEmailLogin" element={<LoginWithEmailPage />} />
        <Route path="/userPhoneLogin" element={<LoginWithPhonePage />} />
        <Route path="/userSignUp" element={<RegistrationPage />} />
        <Route path="/userPassword" element={<PasswordCreationPage />} />
        <Route path="/SellerSignUp" element={<SellerRegistrationPage />} />
        <Route path="/sellerLogin" element={<SellerLoginPage />} />
        <Route path="/sellerPassword" element={<SellerPasswordCreationPage />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/bookAdd" element={<BookAddSellerPage />} />
        <Route path="/bookUpdate" element={<BookUpdateSellerPage />} />
        <Route path="/productDetails" element={<ProductDetailsPage />} />
        <Route path="/orderSuccess" element={<OrderSuccessPage />} />
        <Route path="/userOrders" element={<UserOrderPage/>} />
        <Route path="/addressForm" element={<AddressFormPage />} />
        <Route path="/addressSelector" element={<AddressSelectorPage />} />
        <Route path="/orderItemDetails" element={<OrderItemDetailsPage />} />
        <Route path="/addressContinue" element={<AddressContinue />} />
        <Route path="/sellerOrders" element={<SellerOrderPage />} />
        <Route path="/sellerOrderItemDetails" element={<SellerOrderItemDetailsPage />} />
        <Route path="/searchResults" element={<SearchResultPage />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/comingFeature" element={<UpcomingFeature />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
