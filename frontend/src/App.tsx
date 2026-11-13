
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Search from './pages/Search';
import PropertyDetail from './pages/PropertyDetail';
import Booking from './pages/Booking';
import GuestCabinet from './pages/GuestCabinet';
import OwnerCabinet from './pages/OwnerCabinet';

function App() {
return (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'}>
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/cabinet" element={<GuestCabinet />} />
              <Route path="/owner" element={<OwnerCabinet />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>
);
}

export default App;