// app/api/employees/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // Type params as a Promise for Next.js 15+
) {
  const { id: employeeParamId } = await context.params; // Await params
  const id = parseInt(employeeParamId);

  // Validate the ID
  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid employee ID provided.' }, { status: 400 });
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: id },
      // Select only the fields you need. 'name' and 'email' are good for displaying.
      select: {
        id: true,
        name: true,
        email: true,
        // Add other fields if you display them elsewhere, e.g., 'phoneNumber'
      },
    });

    if (!employee) {
      return NextResponse.json({ message: 'Employee not found.' }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('❌ Error fetching employee details:', error);
    return NextResponse.json({ message: 'Server error while fetching employee.' }, { status: 500 });
  }
}