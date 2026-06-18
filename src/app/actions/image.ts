"use server";
import { prisma } from "@/lib/prisma";

// Cập nhật thứ tự sau khi kéo thả
export async function updateImageOrder(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) => 
      prisma.invitationImage.update({
        where: { id },
        data: { order: index }
      })
    )
  );
}

// Xóa ảnh
export async function deleteImage(imageId: string) {
  return await prisma.invitationImage.delete({ where: { id: imageId } });
}