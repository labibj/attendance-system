// app/api/employees/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees); // ✅ returns an array
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ message: 'Error fetching employees' }, { status: 500 });
  }
}
