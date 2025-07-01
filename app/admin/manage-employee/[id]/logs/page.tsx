// app/admin/manage-employee/[id]/logs/page.tsx
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

// Employee interface - Department field removed
interface Employee {
  id: number;
  name: string;
  email: string; // Keep email if you fetch it, even if not displayed
}

export default function EmployeeLogsPage() {
  const { id } = useParams();
  const [logs, setLogs] = useState<Log[]>([]);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (typeof id !== 'string') { // Ensure id is available and is a string
        setLoading(false);
        console.error('Employee ID is not a string or is missing.');
        return;
      }

      setLoading(true);
      try {
        // Fetch employee logs
        const logsRes = await fetch(`/api/employee-logs/${id}`);
        const logsData = await logsRes.json();
        if (Array.isArray(logsData)) {
          setLogs(logsData);
        } else {
          console.error('API response for logs is not an array:', logsData);
          setLogs([]);
        }

        // Fetch employee details
        const employeeRes = await fetch(`/api/employees/${id}`);
        const employeeData = await employeeRes.json();

        if (employeeRes.ok) {
          setEmployee(employeeData);
        } else {
          console.error('Failed to fetch employee details:', employeeData);
          setEmployee(null);
        }

      } catch (err) {
        console.error('Failed to fetch data:', err);
        setLogs([]);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (loading) return <p>Loading employee data and logs...</p>;

  const employeeName = employee?.name || 'Unknown Employee';

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64">
        <AdminHeader />
        <h2 className="text-xl font-bold mb-4">Break Logs for {employeeName}</h2>

        {logs.length === 0 ? (
          <p>No logs found for {employeeName}.</p>
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
