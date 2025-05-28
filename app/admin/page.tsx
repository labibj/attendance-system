// app/admin/page.tsx

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <nav className="space-y-4">
        <Link
          href="/admin/add-employee"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-200"
        >
          ➕ Add Employee
        </Link>

        <Link
          href="/admin/employees"
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-200"
        >
          🧑‍💼 Manage Employees
        </Link>
      </nav>
    </div>
  );
}
