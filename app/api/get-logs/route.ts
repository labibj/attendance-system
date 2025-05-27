import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const logs = await prisma.log.findMany({
      include: {
        employee: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ logs });
  } catch (err) {
    console.error('❌ Failed to fetch logs:', err);
    return NextResponse.json({ message: 'Failed to fetch logs' }, { status: 500 });
  }
}
