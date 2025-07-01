// app/api/employee-logs/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The correct way to access dynamic params in App Router:
// In Next.js 15+, params is a Promise.
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // Type params as a Promise
) {
  const { id: paramId } = await context.params; // Await params and rename for clarity if desired

  const id = parseInt(paramId); // Parse the awaited string ID

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const logs = await prisma.log.findMany({
      where: { employeeId: id },
      orderBy: { createdAt: 'desc' }, // your valid field from schema
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('❌ Error fetching logs:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}