// app/api/employees/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use a singleton pattern if not already (recommended in lib/prisma.ts for serverless)
const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid employee ID' }, { status: 400 });
  }

  try {
    await prisma.employee.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
