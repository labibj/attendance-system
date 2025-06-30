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

export default function EmployeeLogsPage() {
  const { id } = useParams();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch(`/api/employee-logs/${id}`);
      try {
        const data = await res.json();

        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          console.error('API response is not an array:', data);
        }
      } catch (err) {
        console.error('Failed to parse JSON:', err);
      }
      setLoading(false);
    };

    fetchLogs();
  }, [id]);

  if (loading) return <p>Loading logs...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64">
        <AdminHeader />
        <h2 className="text-xl font-bold mb-4">Break Logs</h2>

        {logs.length === 0 ? (
          <p>No logs found for this employee.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-2 border">{log.type}</td>
                  <td className="p-2 border">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
