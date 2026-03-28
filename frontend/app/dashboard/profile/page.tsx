'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { router.push('/login'); return; }
    fetch('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
      });
  }, []);

  const handleUpdate = async () => {
    setError('');
    setSuccess('');
    if (newPassword && newPassword !== newPassword2) {
      setError('Yeni şifreler eşleşmiyor!');
      return;
    }
    const token = localStorage.getItem('access_token');
    const body: any = { username, email };
    if (newPassword) {
      body.old_password = oldPassword;
      body.new_password = newPassword;
    }
    const res = await fetch('http://127.0.0.1:8000/api/users/update/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      setSuccess('Bilgileriniz güncellendi!');
      setOldPassword('');
      setNewPassword('');
      setNewPassword2('');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      const data = await res.json();
      setError(data.error || 'Bir hata oluştu!');
    }
  };

  if (!user) return <p className="text-center py-10">Yükleniyor...</p>;

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <a href="/dashboard" className="text-indigo-600 hover:underline text-sm">← Dashboard</a>
        <h1 className="text-2xl font-bold text-gray-800">Profil Ayarları</h1>
      </div>
      <div className="bg-white rounded-2xl shadow p-8 space-y-4">
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Kullanıcı Adı</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">E-posta</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <hr className="my-2" />
        <p className="text-sm font-medium text-gray-700">Şifre Değiştir (opsiyonel)</p>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Mevcut Şifre</label>
          <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Yeni Şifre</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Yeni Şifre Tekrar</label>
          <input type="password" value={newPassword2} onChange={e => setNewPassword2(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <button onClick={handleUpdate} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Güncelle
        </button>
      </div>
    </main>
  );
}