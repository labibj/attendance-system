'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminHeader from '@/app/components/AdminHeader';
import AdminSidebar from '@/app/components/AdminSidebar';

export default function EditEmployeePage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', department: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await fetch(`/api/employees/${id}`);
      const data = await res.json();
      setForm({
        name: data.name || '',
        email: data.email || '',
        department: data.department || '',
      });
      setLoading(false);
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('✅ Employee updated!');
      router.push('/admin/manage-employee');
    } else {
      const err = await res.json();
      setMessage(`❌ ${err.message}`);
    }
  };

  if (loading) return <p>Loading employee...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64">
        <AdminHeader />
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-lg space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Save Changes
          </button>

          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
