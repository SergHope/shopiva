'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { router.push('/login'); return; }
    fetch('http://127.0.0.1:8000/api/users/all/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []));
  }, []);

  const handleRoleChange = async (userId: number, role: string) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/change-role/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    });
    if (res.ok) {
      setUsers(users.map(u => u.id === userId ? { ...u, role } : u));
    }
  };

  const handleDelete = async (userId: number) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
    const token = localStorage.getItem('access_token');
    const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/delete/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const roleLabel: any = {
    admin:    '🛡️ Admin',
    seller:   '🏪 Satıcı',
    customer: '👤 Müşteri',
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin-panel" className="text-indigo-600 hover:underline text-sm">← Admin Paneli</a>
        <h1 className="text-2xl font-bold text-gray-800">Kullanıcı Yönetimi</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Kullanıcı</th>
              <th className="text-left px-6 py-3">E-posta</th>
              <th className="text-left px-6 py-3">Rol</th>
              <th className="text-left px-6 py-3">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{user.username}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="customer">👤 Müşteri</option>
                    <option value="seller">🏪 Satıcı</option>
                    <option value="admin">🛡️ Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}