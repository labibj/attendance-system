'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AdminHeader from '@/app/components/AdminHeader';
import AdminSidebar from '@/app/components/AdminSidebar';

interface Log {
  id: number;
  type: string;
  createdAt: string;
}

interface Employee {
  id: number;
  name: string;
  email: string;
}

export default function EmployeeLogsPage() {
  const { id } = useParams();
  const [logs, setLogs] = useState<Log[]>([]);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogsAndEmployee = async () => {
      try {
        // Fetch logs
        const logRes = await fetch(`/api/employee-logs/${id}`);
        const logData = await logRes.json();
        if (Array.isArray(logData)) {
          setLogs(logData);
        } else {
          console.error('Logs response is not an array:', logData);
        }

        // Fetch employee info
        const empRes = await fetch(`/api/employees/${id}`);
        const empData = await empRes.json();
        if (empData?.name) {
          setEmployee(empData);
        } else {
          console.error('Employee data not found:', empData);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogsAndEmployee();
  }, [id]);

  if (loading) return <p>Loading logs...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64">
        <AdminHeader />
        <h2 className="text-xl font-bold mb-4">
          Break Logs {employee?.name ? `for ${employee.name}` : ''}
        </h2>

        {logs.length === 0 ? (
          <p>No logs found for this employee.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className="border-t">
                    <td className="px-6 py-4 text-sm text-gray-800">{log.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{new Date(log.createdAt).toLocaleString()}</td>
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
