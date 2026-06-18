"use server";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ImageType, Category } from "@prisma/client";

export async function uploadMedia(formData: FormData) {
  const file = formData.get("file") as File;
  const invitationId = formData.get("invitationId") as string;
  const type = formData.get("type") as string; // "COVER" | "GALLERY" | "AUDIO"

  if (!file) throw new Error("Chưa chọn file");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // Xác định resource type cho Cloudinary (âm thanh cần type là video hoặc auto)
    const isAudio = file.type.startsWith("audio/") || type === "AUDIO";
    const resourceType = isAudio ? "video" : "image";

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "invitation-platform", resource_type: resourceType },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    }) as any;

    if (isAudio) {
      // 1. Nếu là AUDIO: Tạo bản ghi Music và nối vào Invitation
      const invitation = await prisma.invitation.findUnique({
        where: { id: invitationId }
      });

      const newMusic = await prisma.music.create({
        data: {
          name: file.name.replace(/\.[^/.]+$/, ""), // Lấy tên file bỏ đuôi
          url: result.secure_url,
          publicId: result.public_id,
          category: invitation?.category || Category.WEDDING,
          isCustom: true,
        }
      });

      await prisma.invitation.update({
        where: { id: invitationId },
        data: { musicId: newMusic.id }
      });

    } else {
      // 2. Nếu là HÌNH ẢNH (COVER hoặc GALLERY)
      await prisma.invitationImage.create({
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          type: type as ImageType,
          invitationId: invitationId,
        }
      });
    }

    revalidatePath(`/admin/invitations/${invitationId}`);
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Lỗi khi upload file lên hệ thống");
  }
}