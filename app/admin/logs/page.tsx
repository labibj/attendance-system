'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import AdminHeader from "@/app/components/AdminHeader";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const res = await fetch('/api/get-logs');
      const data = await res.json();
      setLogs(data.logs);
      setLoading(false);
    }

    fetchLogs();
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
      <h2 className="text-2xl font-bold mb-4">Employee Break Logs</h2>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">Employee Email</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">Break Type</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map((log: any) => (
                <tr key={log.id} className="text-center">
                  <td className="px-6 py-4 text-sm text-gray-800">{log.employee.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{log.type.replace(/_/g, ' ')}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(log.createdAt).toLocaleString()}
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
