import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  const adminPasswordHash = await bcrypt.hash('admin123', 10); // or any secure admin password

  // 🌟 Seed regular employee
  await prisma.employee.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password: passwordHash,
      isAdmin: false,
    },
  });

  // 🌟 Seed admin user
  await prisma.employee.upsert({
    where: { email: 'admin@caresynchealth.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@caresynchealth.com',
      password: adminPasswordHash,
      isAdmin: true,
    },
  });

  console.log('✅ Seed complete with employee and admin');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
