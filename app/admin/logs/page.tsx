'use client';

import { useEffect, useState } from 'react';

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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Break Logs</h1>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Employee Email</th>
              <th className="px-4 py-2 border">Break Type</th>
              <th className="px-4 py-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log: any) => (
              <tr key={log.id} className="text-center">
                <td className="border px-4 py-2">{log.employee.email}</td>
                <td className="border px-4 py-2">{log.type.replace(/_/g, ' ')}</td>
                <td className="border px-4 py-2">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
