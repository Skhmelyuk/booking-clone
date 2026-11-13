import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../../context/auth/AuthModal';

function Header() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // API_BASE_URL вже містить /api
        const response = await api.get('/health/');

        if (response.data.status === 'ok') {
          setBackendStatus('Online');
        } else {
          setBackendStatus('Offline');
        }
      } catch {
        setBackendStatus('Offline');
      }
    };

    checkBackend();

    const interval = setInterval(checkBackend, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="bg-booking-blue text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <Link to="/" className="text-2xl font-bold">
            Booking 3D
          </Link>

          <nav className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/cabinet">Guest</Link>
            <Link to="/owner">Owner</Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div>
                  <span className="font-bold">
                    {user.first_name} {user.last_name}
                  </span>

                  <span className="ml-2 rounded bg-white/20 px-2 py-1 text-sm">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="rounded bg-white px-3 py-2 text-booking-blue"
                >
                  Вийти
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded border border-white px-3 py-2"
                >
                  Увійти
                </button>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded bg-white px-3 py-2 text-booking-blue"
                >
                  Реєстрація
                </button>
              </>
            )}

            <div className="text-sm">
              Backend: {backendStatus}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

export default Header;