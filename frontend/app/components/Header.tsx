'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    fetch('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          return null;
        }
        return res.json();
      })
      .then(data => { if (data) setUser(data); });
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-indigo-600">Shopiva</a>
        <input
          type="text"
          placeholder="Ürün ara..."
          className="hidden md:block w-1/3 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {user ? (
            <>
              <a href={user.role === 'admin' ? '/admin-panel' : user.role === 'seller' ? '/vendor' : '/dashboard'} className="hover:text-indigo-600 font-medium">
                👤 {user.username}
              </a>
              <button onClick={handleLogout} className="hover:text-red-500">Çıkış</button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-indigo-600">Giriş Yap</a>
              <a href="/register" className="hover:text-indigo-600">Üye Ol</a>
            </>
          )}
          <a href="/cart" className="hover:text-indigo-600">🛒 Sepet</a>
        </div>
      </div>
    </header>
  );
}