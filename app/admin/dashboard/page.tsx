// app/admin/page.tsx

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers, faRightFromBracket, faListAlt } from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard() {
  return (
    <section className="mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1f396d] text-white flex flex-col items-center justify-center rounded-tl-lg rounded-br-lg    w-full h-40 sm:h-48 md:h-56 lg:h-60 p-4 gap-3">
          <Link href="/admin/add-employee" className='flex flex-col gap-3'>
            <FontAwesomeIcon className='text-5xl' icon={faUserPlus} />
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">
              Add Employee
            </h3>
          </Link>
        </div>
        <div className="bg-[#1f396d] text-white flex flex-col items-center justify-center rounded-tl-lg rounded-br-lg    w-full h-40 sm:h-48 md:h-56 lg:h-60 p-4 gap-3">
          <Link href="/admin/manage-employee" className='flex flex-col gap-3'>
          <FontAwesomeIcon className='text-5xl' icon={faUsers} />
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">
            Manage Employee
          </h3>
          </Link>
        </div>
        <div className="bg-[#1f396d] text-white flex flex-col items-center justify-center rounded-tl-lg rounded-br-lg    w-full h-40 sm:h-48 md:h-56 lg:h-60 p-4 gap-3">
          <Link href="/admin/logs" className='flex flex-col gap-3'>
          <FontAwesomeIcon className='text-5xl' icon={faListAlt} />
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">
            Employee Logs
          </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
