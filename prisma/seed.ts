import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Xóa dòng này nếu bồ không dùng bcrypt

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu tạo dữ liệu mẫu (Seeding)...');

  // 1. Dọn dẹp dữ liệu cũ theo thứ tự để tránh lỗi khóa ngoại (Foreign Key)
  await prisma.invitation.deleteMany();
  await prisma.template.deleteMany();
  await prisma.user.deleteMany(); 

  // 2. TẠO TÀI KHOẢN ADMIN
  // Mã hóa mật khẩu "123456" (Nếu không dùng bcrypt thì để chuỗi "123456" bình thường)
  const hashedPassword = await bcrypt.hash('123456', 10); 

  const adminUser = await prisma.user.create({
    data: {
      id: 'admin_test_id', // Bồ có thể để Prisma tự tạo id bằng cách xóa dòng này đi
      name: 'Admin System',
      email: 'admin@gmail.com',
      // Lưu ý: Sửa chữ "password" thành "hashedPassword" nếu schema của bồ đặt tên như vậy
      password: hashedPassword, 
    }
  });
  console.log(`✅ Đã tạo Tài khoản: ${adminUser.email} | Mật khẩu: 123456`);

  // 3. TẠO TEMPLATE MẶC ĐỊNH
  const defaultTemplate = await prisma.template.create({
    data: {
      name: 'Mẫu Tối Giản (Minimalist)',
      category: 'WEDDING',
      isTemplate: true,
      defaultConfig: {
        sections: ['hero', 'story', 'gallery', 'rsvp'],
        styles: {
          primaryColor: '#0f172a',
          backgroundColor: '#f8fafc',
        },
      },
    },
  });
  console.log(`✅ Đã tạo Template: ${defaultTemplate.name}`);
  console.log('🎉 Seeding thành công! Bồ có thể đăng nhập ngay.');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });