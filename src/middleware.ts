export { default } from "next-auth/middleware";

export const config = {
  // Chỉ định những đường dẫn nào bị "khóa"
  matcher: [
    "/admin/:path*", // Bất kỳ ai vào /admin hoặc các trang con của admin đều bị chặn lại
  ]
};