// app/api/employee-logs/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const logs = await prisma.log.findMany({
      where: {
        employeeId: parseInt(params.id),
      },
      orderBy: {
        createdAt: 'desc', // ✅ Must be a valid field in your schema
      },
    });

    return NextResponse.json(logs); // ✅ returns an array
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json([], { status: 500 }); // Return an empty array on error
  }
}
