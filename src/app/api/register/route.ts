import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Kiểm tra xem email đã có ai dùng chưa
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email này đã được sử dụng!" }, { status: 400 });
    }

    // Mã hóa mật khẩu cho an toàn
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu vào Database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Đã xảy ra lỗi khi đăng ký" }, { status: 500 });
  }
}