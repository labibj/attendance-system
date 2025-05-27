'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/append-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    }
  };

  return (
    <main className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
