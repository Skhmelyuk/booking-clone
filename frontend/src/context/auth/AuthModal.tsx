
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import type { RegisterPayload } from '../../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register, googleLogin } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else {
        if (password !== passwordConfirm) {
          setError('Паролі не збігаються');
          setLoading(false);
          return;
        }

        const data: RegisterPayload = {
          email,
          password,
          password_confirm: passwordConfirm,
          first_name: firstName,
          last_name: lastName,
        };

        await register(data);
      }

      onClose();
    } catch {
      setError('Помилка авторизації. Перевір дані або Backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

        <div className="mb-5 flex justify-between">
          <h2 className="text-2xl font-bold">
            {activeTab === 'login' ? 'Вхід' : 'Реєстрація'}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="mb-5 flex border-b">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 p-3 ${
              activeTab === 'login'
                ? 'border-b-2 border-blue-700 font-bold'
                : ''
            }`}
          >
            Увійти
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 p-3 ${
              activeTab === 'register'
                ? 'border-b-2 border-blue-700 font-bold'
                : ''
            }`}
          >
            Реєстрація
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {activeTab === 'register' && (
            <>
              <input
                type="text"
                placeholder="Ім'я"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded border p-3"
                required
              />

              <input
                type="text"
                placeholder="Прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded border p-3"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-3"
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-3"
            required
          />

          {activeTab === 'register' && (
            <input
              type="password"
              placeholder="Повторіть пароль"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full rounded border p-3"
              required
            />
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-booking-blue p-3 text-white hover:bg-booking-dark"
          >
            {loading
              ? 'Зачекайте...'
              : activeTab === 'login'
                ? 'Увійти'
                : 'Зареєструватися'}
          </button>
        </form>

        <div className="my-5 text-center text-gray-500">
          або
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (response) => {
              if (response.credential) {
                try {
                  await googleLogin(response.credential);
                  onClose();
                } catch {
                  setError('Помилка входу через Google');
                }
              }
            }}
            onError={() => {
              setError('Google авторизація не вдалася');
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default AuthModal;
