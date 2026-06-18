import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Băm mật khẩu mới là "123456"
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  // Cập nhật vào tài khoản admin
  await prisma.user.update({
    where: { email: 'admin@invitation.com' },
    data: { password: hashedPassword }
  });

  console.log('✅ Đã cập nhật mật khẩu thành công!');
  console.log('👉 Email: admin@invitation.com');
  console.log('👉 Password: 123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });