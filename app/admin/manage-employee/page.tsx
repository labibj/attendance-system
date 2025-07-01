// app/admin/manage-employee/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AdminHeader from "@/app/components/AdminHeader";
import AdminSidebar from "@/app/components/AdminSidebar";

// Define the Employee interface - Department field removed
interface Employee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ManageEmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployeeToEdit, setCurrentEmployeeToEdit] = useState<Employee | null>(null);

  // State for custom confirmation/alert messages
  const [messageModal, setMessageModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }>({ isOpen: false, title: '', message: '' });

  // Function to fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
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

  // Handler for opening the edit modal
  const handleEdit = (employee: Employee) => {
    setCurrentEmployeeToEdit(employee);
    setIsEditModalOpen(true);
  };

  // Handler for closing the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEmployeeToEdit(null);
  };

  // Handler for updating an employee
  const handleUpdateEmployee = async (updatedEmployee: Employee) => {
    try {
      const res = await fetch(`/api/employees/${updatedEmployee.id}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        // Update the employee in the local state
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        );
        closeEditModal(); // Close the modal on success
        setMessageModal({
          isOpen: true,
          title: 'Success',
          message: 'Employee updated successfully!',
        });
      } else {
        const errorData = await res.json();
        setMessageModal({
          isOpen: true,
          title: 'Error',
          message: `Failed to update employee: ${errorData.message || res.statusText}`,
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessageModal({
        isOpen: true,
        title: 'Error',
        message: 'Something went wrong while updating the employee.',
      });
    }
  };

  // Handler for deleting an employee (now with custom confirmation)
  const handleDelete = (id: string) => {
    setMessageModal({
      isOpen: true,
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this employee?',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
          });

          if (res.ok) {
            setEmployees((prev) => prev.filter((emp) => emp.id !== id));
            setMessageModal({
              isOpen: true,
              title: 'Success',
              message: 'Employee deleted successfully!',
            });
          } else {
            const errorData = await res.json();
            setMessageModal({
              isOpen: true,
              title: 'Error',
              message: `Failed to delete employee: ${errorData.message || res.statusText}`,
            });
          }
        } catch (err) {
          console.error("Delete error:", err);
          setMessageModal({
            isOpen: true,
            title: 'Error',
            message: 'Something went wrong while deleting the employee.',
          });
        }
      },
      onCancel: () => setMessageModal({ isOpen: false, title: '', message: '' }),
    });
  };

  // Fetch employees on component mount
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
          <div className="overflow-x-auto bg-white shadow rounded-lg rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{emp.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <div className='flex gap-3'>
                        <button
                          className="text-blue-600 hover:underline px-3 py-1 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors"
                          onClick={() => handleEdit(emp)} // Call handleEdit
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline px-3 py-1 rounded-md bg-red-100 hover:bg-red-200 transition-colors"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                        <a
                          href={`/admin/manage-employee/${emp.id}/logs`}
                          className="text-purple-600 hover:underline px-3 py-1 rounded-md bg-purple-100 hover:bg-purple-200 transition-colors"
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

      {/* Edit Employee Modal */}
      {isEditModalOpen && currentEmployeeToEdit && (
        <EditEmployeeModal
          employee={currentEmployeeToEdit}
          onClose={closeEditModal}
          onSave={handleUpdateEmployee}
        />
      )}

      {/* Custom Message/Confirmation Modal */}
      {messageModal.isOpen && (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          onConfirm={messageModal.onConfirm}
          onCancel={messageModal.onCancel}
          onClose={() => setMessageModal({ isOpen: false, title: '', message: '' })} // Close handler for simple alerts
        />
      )}
    </div>
  );
}

// --- EditEmployeeModal Component ---
interface EditEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
  onSave: (updatedEmployee: Employee) => void;
}

function EditEmployeeModal({ employee, onClose, onSave }: EditEmployeeModalProps) {
  const [formData, setFormData] = useState<Employee>(employee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Employee</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {/* Department field removed */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- MessageModal Component (for custom alerts/confirmations) ---
interface MessageModalProps {
  title: string;
  message: string;
  onClose: () => void; // For simple alerts
  onConfirm?: () => void; // For confirmation dialogs
  onCancel?: () => void; // For confirmation dialogs
}

function MessageModal({ title, message, onClose, onConfirm, onCancel }: MessageModalProps) {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          {onConfirm && onCancel ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
