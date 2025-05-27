import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const existing = await prisma.employee.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: 'Employee already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Employee added' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
