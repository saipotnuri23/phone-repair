
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LoginSignupModal from './Components/Login/LoginSignupModal';
import Home from './Components/Home/Home';
import Services from './Components/Services/Services';
import Repair from './Components/Home/Repair';
import PhoneModels from './Components/PhoneModels/PhoneModels';
import ShopList from './Components/ShopList/ShopList';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/scrollToTop';
import Contact from './Components/Contact/Contact';
import FAQ from './Components/FAQ/FAQ';
import AccessoriesPage from './Components/Accessories/AccessoriesPage';
import BuyNowPage from './Components/Accessories/BuyNowPage';
import AddressPage from './Components/Accessories/AddressPage';
import Payment from './Components/Accessories/Payment';
import ProtectedRoute from './Components/ProtectedRoute';
import NearShops from './Components/ShopList/NearShops';
import About from './Components/Menu/About';
import './index.css';
import './Styles/Responsive.css';
import TrackOrder from './Components/ShopList/TrackOrder';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartPage from './Components/Accessories/CartPage';
import MyOrders from './Components/Accessories/MyOrders';
import Notifications from './Components/Notifications';
import RespondedOffers from './Components/RespondedOffers';


function App({ hideFooter }) {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const savedUser = JSON.parse(localStorage.getItem('user'));
    setUser(savedUser);
    setShowLoginModal(false);
  };

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar
        onLoginClick={() => setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            />
          }
        />

        <Route
          path="/PhoneModels"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <PhoneModels />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repair"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <Repair />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NearShops"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <NearShops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/track-order"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <TrackOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/responded-offers"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <RespondedOffers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <CartPage/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/my-orders"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <MyOrders/>
            </ProtectedRoute>
          }
        />

        

        <Route path="/shoplist" element={<ShopList />} />
        <Route path="/services" element={<Services />} />

        <Route
          path="/contact"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/accessories" element={<AccessoriesPage />} />

        <Route
          path="/buy/:id"
          element={
            <BuyNowPage
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            />
          }
        />

        <Route
          path="/address"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <AddressPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onLoginRequired={() => setShowLoginModal(true)}
            >
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}

      {showLoginModal && (
        <LoginSignupModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;
