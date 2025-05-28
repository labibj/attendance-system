// app/api/employees/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
