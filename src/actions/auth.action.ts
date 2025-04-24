"use server"
import {getSession} from "@/src/lib/session";
import {prisma} from "@/src/lib/prisma";

export async function getUserSession() {
  const session = await getSession();
  return prisma.user.findUnique({where: {id: session?.userId}});
}