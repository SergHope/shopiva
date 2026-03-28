'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState({ title: '', address: '', city: '', phone: '' });
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('addresses');
    if (stored) setAddresses(JSON.parse(stored));
  }, []);

  const saveAddresses = (list: any[]) => {
    localStorage.setItem('addresses', JSON.stringify(list));
    setAddresses(list);
  };

  const handleAdd = () => {
    if (!newAddress.title || !newAddress.address || !newAddress.city || !newAddress.phone) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    saveAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setNewAddress({ title: '', address: '', city: '', phone: '' });
    setAdding(false);
  };

  const handleDelete = (id: number) => {
    saveAddresses(addresses.filter((a: any) => a.id !== id));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <a href="/dashboard" className="text-indigo-600 hover:underline text-sm">← Dashboard</a>
        <h1 className="text-2xl font-bold text-gray-800">Adreslerim</h1>
      </div>

      <div className="space-y-4">
        {addresses.map((addr: any) => (
          <div key={addr.id} className="bg-white rounded-xl shadow p-5 flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">{addr.title}</p>
              <p className="text-sm text-gray-500">{addr.address}, {addr.city}</p>
              <p className="text-sm text-gray-500">{addr.phone}</p>
            </div>
            <button onClick={() => handleDelete(addr.id)} className="text-red-500 text-sm hover:text-red-700">Sil</button>
          </div>
        ))}

        {adding ? (
          <div className="bg-white rounded-xl shadow p-5 space-y-3">
            <input placeholder="Adres Başlığı (örn: Ev, İş)" value={newAddress.title} onChange={e => setNewAddress({...newAddress, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <input placeholder="Adres" value={newAddress.address} onChange={e => setNewAddress({...newAddress, address: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <input placeholder="Şehir" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <input placeholder="Telefon" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <div className="flex gap-3">
              <button onClick={handleAdd} className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-indigo-700">Kaydet</button>
              <button onClick={() => setAdding(false)} className="text-gray-500 text-sm hover:text-gray-700">İptal</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl py-4 hover:bg-indigo-50 transition text-sm">
            + Yeni Adres Ekle
          </button>
        )}
      </div>
    </main>
  );
}