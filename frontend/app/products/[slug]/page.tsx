'use client';

import { useState, useEffect, use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${slug}/`, { cache: 'no-store' })
      .then(res => res.json())
      .then(setProduct);
  }, [slug]);

  const addToCart = () => {
    const stored = localStorage.getItem('cart');
    const cart = stored ? JSON.parse(stored) : [];
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/cart';
  };

  if (!product) return <p className="text-center py-10">Yükleniyor...</p>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-gray-400">Resim yok</span>
          )}
        </div>
        <div>
          <p className="text-indigo-500 text-sm mb-1">{product.category?.name}</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h1>
          <p className="text-gray-500 text-sm mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-indigo-600 mb-6">{product.price} ₺</p>
          {product.variants?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Seçenekler:</p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v: any) => (
                  <span key={v.id} className="border border-indigo-300 text-indigo-600 text-xs px-3 py-1 rounded-full">
                    {v.name}: {v.value}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button onClick={addToCart} className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
            Sepete Ekle
          </button>
        </div>
      </div>
    </main>
  );
}