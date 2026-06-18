import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Dùng JWT để lưu phiên đăng nhập cho nhẹ và nhanh
  session: {
    strategy: "jwt",
  },
  // Chuyển hướng người dùng về trang này nếu họ chưa đăng nhập
  pages: {
    signIn: "/login", 
  },
  providers: [
    CredentialsProvider({
      name: "Tài khoản",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ email và mật khẩu");
        }

        // 1. Tìm User trong Database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Tài khoản không tồn tại");
        }

        // 2. Kiểm tra mật khẩu (So sánh hash)
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Mật khẩu không chính xác");
        }

        // 3. Đăng nhập thành công -> Trả về thông tin gắn vào Token
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  callbacks: {
    // Nhét ID của User vào Token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Chuyền ID từ Token sang Session để Lấy ra dùng ở các component khác
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };