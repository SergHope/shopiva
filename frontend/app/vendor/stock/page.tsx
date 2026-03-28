'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorStockPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [updating, setUpdating] = useState<number | null>(null);
  const [newStock, setNewStock] = useState<string>('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { router.push('/login'); return; }
    fetch('http://127.0.0.1:8000/api/products/')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const handleUpdate = async (productId: number) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`http://127.0.0.1:8000/api/products/${productId}/update-stock/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stock: parseInt(newStock) })
    });

    if (res.ok) {
      setProducts(products.map(p => p.id === productId ? { ...p, stock: parseInt(newStock) } : p));
      setUpdating(null);
      setNewStock('');
      setSuccess('Stok güncellendi!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <a href="/vendor" className="text-indigo-600 hover:underline text-sm">← Satıcı Paneli</a>
        <h1 className="text-2xl font-bold text-gray-800">Stok Yönetimi</h1>
      </div>

      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      <div className="space-y-4">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Resim yok</div>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {updating === product.id ? (
                <>
                  <input
                    type="number"
                    value={newStock}
                    onChange={e => setNewStock(e.target.value)}
                    placeholder="Yeni stok"
                    className="w-24 border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <button onClick={() => handleUpdate(product.id)} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700">Kaydet</button>
                  <button onClick={() => setUpdating(null)} className="text-gray-500 text-sm">İptal</button>
                </>
              ) : (
                <>
                  <span className={`text-sm font-medium ${product.stock < 5 ? 'text-red-500' : 'text-gray-700'}`}>
                    Stok: {product.stock}
                  </span>
                  <button
                    onClick={() => { setUpdating(product.id); setNewStock(String(product.stock)); }}
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    Güncelle
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}