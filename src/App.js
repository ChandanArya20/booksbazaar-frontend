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
import BookSellerPage from "./pages/BookSellerPage";
import BookUpdateSellerPage from "./pages/BookUpdateSellerPage";
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
        <Route path="/bookSellerPage" element={<BookSellerPage />} />
        <Route path="/bookUpdateSellerPage" element={<BookUpdateSellerPage />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/comingFeature" element={<UpcomingFeature />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
