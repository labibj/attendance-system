// app/api/employees/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET handler to fetch a single employee by ID (from previous step)
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // Type params as a Promise for Next.js 15+
) {
  const { id: employeeParamId } = await context.params; // Await params
  const id = parseInt(employeeParamId);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid employee ID provided.' }, { status: 400 });
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        // department: true, // Include department if you plan to edit it
        createdAt: true,
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

// PATCH handler to update an existing employee by ID
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // Type params as a Promise
) {
  const { id: employeeParamId } = await context.params; // Await params
  const id = parseInt(employeeParamId);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid employee ID provided.' }, { status: 400 });
  }

  try {
    const body = await req.json(); // Get the updated data from the request body
    const { name, email } = body; // Destructure fields you expect to update

    // Basic validation (add more as needed)
    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 });
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: id },
      data: {
        name: name,
        email: email,
        // department: department, // Update department if provided
        // Add other fields you want to allow updating
      },
      select: { // Select fields to return in the response
        id: true,
        name: true,
        email: true,
        //department: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error: any) {
    console.error('❌ Error updating employee:', error);
    // Handle Prisma specific errors, e.g., P2025 for record not found
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Employee not found for update.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Server error while updating employee.', error: error.message }, { status: 500 });
  }
}

// DELETE handler (already existing, but included for completeness)
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: employeeParamId } = await context.params;
  const id = parseInt(employeeParamId);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid employee ID provided.' }, { status: 400 });
  }

  try {
    await prisma.employee.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Employee deleted successfully.' }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error deleting employee:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Employee not found for deletion.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Server error while deleting employee.', error: error.message }, { status: 500 });
  }
}
