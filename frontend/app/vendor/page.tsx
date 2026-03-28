'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorPage() {
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
        if (data.role !== 'seller' && data.role !== 'admin') {
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
            <h1 className="text-2xl font-bold text-gray-800">Satıcı Paneli 🏪</h1>
            <p className="text-gray-500 text-sm mt-1">Hoş geldin, {user.username}!</p>
          </div>
          <a href="/" className="text-sm text-indigo-600 hover:underline">← Mağazaya Dön</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/vendor/products" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">📦</p>
            <h2 className="font-semibold text-gray-800">Ürünlerim</h2>
            <p className="text-sm text-gray-500">Ürünleri yönet ve ekle</p>
          </a>
          <a href="/vendor/orders" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">🛒</p>
            <h2 className="font-semibold text-gray-800">Siparişler</h2>
            <p className="text-sm text-gray-500">Gelen siparişleri takip et</p>
          </a>
          <a href="/vendor/stock" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition">
            <p className="text-3xl mb-2">📊</p>
            <h2 className="font-semibold text-gray-800">Stok Yönetimi</h2>
            <p className="text-sm text-gray-500">Stok güncelle</p>
          </a>
        </div>
      </div>
    </main>
  );
}