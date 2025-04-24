"use server"
import {createSession, getSession} from "@/src/lib/session";
import {prisma} from "@/src/lib/prisma";
import {SignUpSchema} from "@/src/schema/auth.schema";
import {redirect} from "next/navigation";

export async function getUserSession() {
  const session = await getSession();
  return prisma.user.findUnique({where: {id: session?.userId}});
}

export async function signUp(prevState: any, formData: FormData) {
  const result = SignUpSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // const hashedPassword = await bcrypt.hash(result.data.password, 10);
  const user = await prisma.user.create({
    data: {
      ...result.data,
      // password: hashedPassword,
    }
  });

  await createSession({
    userId: user.id,
  })

  redirect("/chat")
}