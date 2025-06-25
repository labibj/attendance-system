'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import AdminHeader from "@/app/components/AdminHeader";
import AdminSidebar from "@/app/components/AdminSidebar";
import { useRouter } from 'next/navigation';

export default function AddEmployeePage() {
  const router = useRouter();

  // 🔒 Check admin auth
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
    }
  }, []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/add-employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage('✅ Employee added successfully!');
      setForm({ name: '', email: '', password: '' });
    } else {
      setMessage(`❌ Error: ${data.message}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
        <AdminSidebar />
        {/* Main Content */}
        <div className="flex-1 p-6 ml-64">
          {/* Header */}
          <AdminHeader />

          <div className=''></div>
        
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Employee</h2>

          {/* 👤 Add Employee Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded p-6 w-full max-w-md space-y-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </button>

            {message && <p className="text-sm mt-2">{message}</p>}
          </form>
      </div>
    </div>
  );
}
