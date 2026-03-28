'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { router.push('/login'); return; }
    fetch('http://127.0.0.1:8000/api/orders/all-orders/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []));
  }, []);

  const statusLabel: any = {
    pending:   '⏳ Beklemede',
    confirmed: '✅ Onaylandı',
    shipped:   '🚚 Kargoya Verildi',
    delivered: '📦 Teslim Edildi',
    cancelled: '❌ İptal Edildi',
  };

  const handleStatusChange = async (orderId: number, status: string) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/update-status/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin-panel" className="text-indigo-600 hover:underline text-sm">← Admin Paneli</a>
        <h1 className="text-2xl font-bold text-gray-800">Sipariş Yönetimi</h1>
      </div>
      {orders.length === 0 ? (
        <p className="text-gray-500">Henüz sipariş yok.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-gray-800">Sipariş #{order.id}</p>
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="pending">⏳ Beklemede</option>
                  <option value="confirmed">✅ Onaylandı</option>
                  <option value="shipped">🚚 Kargoya Verildi</option>
                  <option value="delivered">📦 Teslim Edildi</option>
                  <option value="cancelled">❌ İptal Edildi</option>
                </select>
              </div>
              <p className="text-sm text-gray-500 mb-3">Adres: {order.address}</p>
              <div className="space-y-2">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>{item.price} ₺</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-3 flex justify-between">
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('tr-TR')}</p>
                <p className="font-bold text-gray-800">{order.total} ₺</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}