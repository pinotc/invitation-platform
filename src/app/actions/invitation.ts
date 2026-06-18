"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Category } from "@prisma/client";

export async function createInvitation(formData: FormData) {
  const templateId = formData.get("templateId") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;

  const userId = "admin_test_user_id";

  const template = await prisma.template.findUnique({
    where: { id: templateId }
  });
  
  if (!template) throw new Error("Mẫu giao diện không tồn tại");
  const templateConfig = template.defaultConfig as any;

  const newInvitation = await prisma.invitation.create({
    data: {
      title,
      slug,
      templateId,
      category: template.category as Category,
      userId: "admin_test_id",
      
      themeConfig: template.defaultConfig as any,
      eventData: {
        eventName: title,
        eventDate: new Date().toISOString().split('T')[0],
        location: "Chưa cấu hình địa điểm vui lòng sửa",
      } as any,
      
      openingAnimation: templateConfig?.openingAnimation || "envelope"
    }
  });

  redirect(`/admin/invitations/${newInvitation.id}`);
}

export async function deleteInvitation(id: string) {
  await prisma.invitation.delete({
    where: { id }
  });
  revalidatePath("/admin/invitations");
}

export async function updateEventData(formData: FormData) {
  const id = formData.get("id") as string;
  const openingAnimation = formData.get("openingAnimation") as string;
  const globalBgImage = formData.get("globalBgImage") as string;
  
  // 1. Lấy dữ liệu Block từ Form trước
  const blocksDataRaw = formData.get("blocksData") as string;
  let parsedBlocks = [];
  try {
    if (blocksDataRaw) parsedBlocks = JSON.parse(blocksDataRaw);
  } catch (error) {
    console.error("Lỗi parse Blocks:", error);
  }

  // 2. Lấy dữ liệu hiện tại từ DB trước
  const currentInv = await prisma.invitation.findUnique({ 
    where: { id }, 
    select: { themeConfig: true } 
  });
  
  const currentThemeConfig = (currentInv?.themeConfig as any) || {};
  const currentStyles = currentThemeConfig.styles || {};

  // 3. Xây dựng config mới
  const newThemeConfig = {
    ...currentThemeConfig,
    sections: parsedBlocks,
    styles: {
      ...currentStyles,
      backgroundImage: globalBgImage
    }
  };

  // 4. Bóc tách dữ liệu Event từ form
  const eventData = {
    eventName: formData.get("eventName") as string,
    brideName: formData.get("brideName") as string,
    groomName: formData.get("groomName") as string,
    eventDate: formData.get("eventDate") as string,
    eventTime: formData.get("eventTime") as string,
    location: formData.get("location") as string,
    googleMapsUrl: formData.get("googleMapsUrl") as string,
    hostName: formData.get("hostName") as string,
    bankAccount: formData.get("bankAccount") as string,
    bankId: formData.get("bankId") as string,
    bankName: formData.get("bankName") as string,
    storyText: formData.get("storyText") as string,
    videoUrl: formData.get("videoUrl") as string,
    groomFatherName: formData.get("groomFatherName") as string,
    groomMotherName: formData.get("groomMotherName") as string,
    groomAddress: formData.get("groomAddress") as string,
    brideFatherName: formData.get("brideFatherName") as string,
    brideMotherName: formData.get("brideMotherName") as string,
    brideAddress: formData.get("brideAddress") as string,
  };

  // 5. Update DB
  await prisma.invitation.update({
    where: { id },
    data: { 
      eventData: eventData as any,
      openingAnimation: openingAnimation,
      themeConfig: newThemeConfig as any
    } 
  });

  revalidatePath(`/admin/invitations/${id}`);
  return { success: true };
}