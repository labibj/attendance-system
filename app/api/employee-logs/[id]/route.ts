// app/api/employee-logs/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const logs = await prisma.log.findMany({
      where: {
        employeeId: parseInt(params.id),
      },
      orderBy: {
        createdAt: 'desc', // ✅ Based on your schema
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching employee logs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
