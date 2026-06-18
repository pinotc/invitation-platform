import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Chưa xác thực" }, { status: 401 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();
    const userId = (session.user as any).id;

    // 1. Tìm user hiện tại
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });

    const updateData: any = { name, email };

    // 2. Nếu người dùng muốn đổi mật khẩu
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ message: "Vui lòng nhập mật khẩu hiện tại" }, { status: 400 });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password!);
      if (!isPasswordValid) {
        return NextResponse.json({ message: "Mật khẩu hiện tại không chính xác" }, { status: 400 });
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // 3. Cập nhật vào DB
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 });
  }
}