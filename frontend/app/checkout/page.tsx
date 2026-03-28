'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [shipping, setShipping] = useState('standard');
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shippingCost = shipping === 'express' ? 49.99 : 19.99;

  const handleOrder = () => {
    if (!address || !city || !phone) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    localStorage.removeItem('cart');
    router.push('/order-success');
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Sipariş Tamamla</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Sol: Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Teslimat Adresi</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Adres"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Şehir"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Telefon"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Kargo Yöntemi</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-indigo-400">
                <input type="radio" name="shipping" value="standard" checked={shipping === 'standard'} onChange={() => setShipping('standard')} />
                <div>
                  <p className="text-sm font-medium">Standart Kargo</p>
                  <p className="text-xs text-gray-500">3-5 iş günü • 19.99 ₺</p>
                </div>
              </label>
              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-indigo-400">
                <input type="radio" name="shipping" value="express" checked={shipping === 'express'} onChange={() => setShipping('express')} />
                <div>
                  <p className="text-sm font-medium">Hızlı Kargo</p>
                  <p className="text-xs text-gray-500">1-2 iş günü • 49.99 ₺</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Sağ: Özet */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Sipariş Özeti</h2>
          <div className="space-y-3 mb-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} x {item.quantity}</span>
                <span>{(parseFloat(item.price) * item.quantity).toFixed(2)} ₺</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Ara Toplam</span>
              <span>{total.toFixed(2)} ₺</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Kargo</span>
              <span>{shippingCost.toFixed(2)} ₺</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t">
              <span>Toplam</span>
              <span>{(total + shippingCost).toFixed(2)} ₺</span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Siparişi Onayla
          </button>
        </div>
      </div>
    </main>
  );
}