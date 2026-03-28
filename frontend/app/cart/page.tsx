'use client';

import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart([...newCart]);
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sepetim</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Sepetiniz boş.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item: any, index: number) => (
            <div key={index} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Resim yok</div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">{item.name}</h2>
                <p className="text-indigo-600 font-bold mt-1">{item.price} ₺</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-gray-800 font-medium w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <p className="text-gray-700 font-semibold w-24 text-right">
                {(parseFloat(item.price) * item.quantity).toFixed(2)} ₺
              </p>
            </div>
          ))}
          <div className="text-right mt-6">
            <p className="text-xl font-bold text-gray-800 mb-4">Toplam: {total.toFixed(2)} ₺</p>
            <button
              onClick={() => window.location.href = '/checkout'}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Siparişi Tamamla
            </button>
          </div>
        </div>
      )}
    </main>
  );
}