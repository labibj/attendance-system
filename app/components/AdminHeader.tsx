"use client";

import Image from "next/image"; // Next.js optimized Image component
import Link from "next/link"; // Next.js Link component for client-side navigation
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers, faRightFromBracket, faListAlt } from '@fortawesome/free-solid-svg-icons';

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/admin/login');
    };
  return (
    <>
      
      {/* Main header section with background image */}
      <header>
        {/* Inner header image section */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h1 className="text-2xl font-bold  text-gray-800">ADMIN DASHBOARD</h1>
            <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#edf5f4] hover:bg-[#36a5dd] text-[#121e44] hover:text-white transition-all rounded-full border border-[#121e44] px-5 py-2 text-base "
            >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
            </button>
        </div>
      </header>
    </>
  );
}