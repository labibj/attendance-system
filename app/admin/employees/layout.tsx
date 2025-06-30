'use client';

import React from 'react';
import Link from 'next/link';
import AdminAuthGuard from '@/app/components/AdminAuthGuard'; // ✅ Import

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <main>{children}</main>
    </AdminAuthGuard>
  );
}
