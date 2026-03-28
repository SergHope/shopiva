'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '' });
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { router.push('/login'); return; }

    fetch('http://127.0.0.1:8000/api/products/', { cache: 'no-store' })
      .then(res => res.json())
      .then(setProducts);

    fetch('http://127.0.0.1:8000/api/products/categories/', { cache: 'no-store' })
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleAdd = async () => {
    const token = localStorage.getItem('access_token');
    const slug  = form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const res   = await fetch('http://127.0.0.1:8000/api/products/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...form, slug })
    });

    if (res.ok) {
      const data = await res.json();
      setProducts([...products, data]);
      setForm({ name: '', description: '', price: '', stock: '', category: '' });
      setAdding(false);
      setSuccess('Ürün başarıyla eklendi!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <a href="/vendor" className="text-indigo-600 hover:underline text-sm">← Satıcı Paneli</a>
          <h1 className="text-2xl font-bold text-gray-800">Ürünlerim</h1>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          + Yeni Ürün
        </button>
      </div>

      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      {adding && (
        <div className="bg-white rounded-xl shadow p-6 mb-6 space-y-3">
          <h2 className="font-semibold text-gray-700 mb-2">Yeni Ürün Ekle</h2>
          <input placeholder="Ürün Adı" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <textarea placeholder="Açıklama" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <input placeholder="Fiyat" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <input placeholder="Stok" type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">Kategori Seç</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="flex gap-3">
            <button onClick={handleAdd} className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-indigo-700">Kaydet</button>
            <button onClick={() => setAdding(false)} className="text-gray-500 text-sm hover:text-gray-700">İptal</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
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
                <p className="text-indigo-600 font-bold text-sm">{product.price} ₺</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Stok: {product.stock}</p>
          </div>
        ))}
      </div>
    </main>
  );
}