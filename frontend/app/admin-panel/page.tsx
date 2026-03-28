'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanelPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { router.push('/login'); return; }
    fetch('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.role !== 'admin') {
          router.push('/');
          return;
        }
        setUser(data);
      });
  }, []);

  if (!user) return <p className="text-center py-10">Yükleniyor...</p>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Paneli 🛡️</h1>
            <p className="text-gray-500 text-sm mt-1">Hoş geldin, {user.username}!</p>
          </div>
          <a href="/" className="text-sm text-indigo-600 hover:underline">← Mağazaya Dön</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin-panel/users" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">👥</p>
            <h2 className="font-semibold text-gray-800">Kullanıcı Yönetimi</h2>
            <p className="text-sm text-gray-500">Kullanıcıları görüntüle, rol değiştir, sil</p>
          </a>
          <a href="/admin-panel/orders" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">📦</p>
            <h2 className="font-semibold text-gray-800">Sipariş Yönetimi</h2>
            <p className="text-sm text-gray-500">Tüm siparişleri görüntüle ve yönet</p>
          </a>
        </div>
      </div>
    </main>
  );
}