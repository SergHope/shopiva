'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetch('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        if (data.role === 'seller') {
          router.push('/vendor');
        } else if (data.role === 'admin') {
          router.push('/admin-panel');
        }
      });
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/');
  };

  if (!user) return <p className="text-center py-10">Yükleniyor...</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hoş geldin, {user.username}! 👋</h1>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/dashboard/orders" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">📦</p>
            <h2 className="font-semibold text-gray-800">Siparişlerim</h2>
            <p className="text-sm text-gray-500">Geçmiş siparişlerin</p>
          </a>
          <a href="/dashboard/addresses" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">📍</p>
            <h2 className="font-semibold text-gray-800">Adreslerim</h2>
            <p className="text-sm text-gray-500">Kayıtlı adreslerini yönet</p>
          </a>
          <a href="/dashboard/profile" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">👤</p>
            <h2 className="font-semibold text-gray-800">Profil Ayarları</h2>
            <p className="text-sm text-gray-500">Bilgilerini güncelle</p>
          </a>
        </div>
      </div>
    </main>
  );
}