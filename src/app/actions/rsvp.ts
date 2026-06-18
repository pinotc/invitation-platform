"use server";

import { prisma } from "@/lib/prisma";
import { RsvpStatus } from "@prisma/client";

export async function submitRsvp(formData: FormData) {
  const invitationId = formData.get("invitationId") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const guestsCount = parseInt(formData.get("guestsCount") as string || "1");
  const status = formData.get("status") as RsvpStatus;
  const message = formData.get("message") as string;

  if (!name || !invitationId) {
    throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
  }

  await prisma.rsvp.create({
    data: {
      invitationId,
      name,
      phone,
      guestsCount,
      status,
      message,
    }
  });

  return { success: true };
}