import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const admin = await prisma.employee.findUnique({ where: { email } });

    if (!admin || !admin.isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ admin: { email: admin.email, name: admin.name } });
  } catch (err) {
    console.error('Admin Login Error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
