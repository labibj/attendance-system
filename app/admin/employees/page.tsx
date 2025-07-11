// app/admin/employees/page.tsx

'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import AdminHeader from "@/app/components/AdminHeader";
import AdminSidebar from "@/app/components/AdminSidebar";

interface Employee {
  id: number;
  name: string;
  email: string;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  const deleteEmployee = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEmployees(employees.filter((emp) => emp.id !== id));
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      setDeletingId(null);
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
      
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee List</h2>

        {employees.length === 0 ? (
          <p className="text-gray-600">No employees found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{emp.email}</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <button
                        onClick={() => deleteEmployee(emp.id)}
                        className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                        disabled={deletingId === emp.id}
                      >
                        {deletingId === emp.id ? 'Deleting...' : 'Delete'}
                      </button>
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
