'use client';

import { useEffect, useState } from 'react';
import AdminHeader from "@/app/components/AdminHeader";
import AdminSidebar from "@/app/components/AdminSidebar";

interface Employee {
  id: string;
  name: string;
  email: string;
  department?: string;
  createdAt: string;
}

export default function ManageEmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employees');
      const data = await res.json();

      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error("API response is not an array:", data);
        setError('Failed to load employee data.');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Something went wrong while fetching employees.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure to delete this employee?')) return;

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } else {
        alert('Failed to delete employee.');
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <h2 className="text-xl font-bold mb-4">Manage Employees</h2>

        {loading && <p>Loading employees...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && employees.length === 0 && !error && (
          <p>No employees found.</p>
        )}

        {!loading && employees.length > 0 && (
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
                        {/* <th className="px-6 py-3 text-left text-sm font-semibold text-white">Department</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Joined</th> */}
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                        <td className="px-6 py-4 text-sm text-gray-800">{emp.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{emp.email}</td>
                        {/* <td className="px-6 py-4 text-sm text-gray-800">{emp.department || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                            {new Date(emp.createdAt).toLocaleDateString()}
                        </td> */}
                        <td className="px-6 py-4 text-sm text-gray-800">
                            <div className='flex gap-3'>
                                <button className="text-blue-600 hover:underline">Edit</button>
                                <button
                                className="text-red-600 hover:underline"
                                onClick={() => handleDelete(emp.id)}
                                >
                                Delete
                                </button>
                                <a
                                    href={`/admin/manage-employee/${emp.id}/logs`}
                                    className="text-purple-600 hover:underline"
                                >
                                    View Logs
                                </a>

                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
}
