// app/api/employees/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
