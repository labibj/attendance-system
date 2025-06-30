import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const logs = await prisma.log.findMany({
      where: {
        employeeId: parseInt(id),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json([], { status: 500 });
  }
}
