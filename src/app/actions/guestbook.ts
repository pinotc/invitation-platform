"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Phải có chữ "export" ở đây
export async function addGuestbookEntry(invitationId: string, name: string, message: string) {
  await prisma.guestbookEntry.create({
    data: { invitationId, name, message }
  });
  revalidatePath(`/invite/${invitationId}`);
}

// Phải có chữ "export" ở đây
export async function getGuestbookEntries(invitationId: string) {
  return await prisma.guestbookEntry.findMany({
    where: { invitationId },
    orderBy: { createdAt: "desc" }
  });
}