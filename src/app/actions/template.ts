"use server";
import { prisma } from "@/lib/prisma";

export async function saveAsTemplate(invitationId: string, templateName: string) {
  try {
    console.log("--- BẮT ĐẦU SAVE TEMPLATE ---");
    const inv = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: { themeConfig: true }
    });

    if (!inv) {
      console.log("Không tìm thấy thiệp với ID:", invitationId);
      throw new Error("Thiệp mời không tồn tại!");
    }

    const template = await prisma.template.create({
      data: {
        name: templateName,
        defaultConfig: inv.themeConfig as any,
        isTemplate: true
      }
    });
    
    console.log("LƯU THÀNH CÔNG, ID:", template.id);
    return { success: true, id: template.id };
  } catch (error: any) {
    console.error("LỖI CHI TIẾT:", error);
    return { success: false, message: error.message }; // Trả về object thay vì throw error
  }
}