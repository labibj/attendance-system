'use client';

import React from 'react';
import AdminAuthGuard from '@/app/components/AdminAuthGuard'; // ✅ Import

export default function ManageEmployeePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
          <main className="">{children}</main>
        </AdminAuthGuard>
  );
}
