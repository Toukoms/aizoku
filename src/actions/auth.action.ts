"use server"
import {createSession, getSession, removeSession} from "@/src/lib/session";
import {prisma} from "@/src/lib/prisma";
import {LoginSchema, SignUpSchema, TLoginSchema, TSignUpSchema} from "@/src/schema/auth.schema";
import {compare, generateSalt, hash} from "@/src/lib/crypt";
import {redirect} from "next/navigation";

export async function getUserSession() {
  const session = await getSession();
  return prisma.user.findUnique({where: {id: session?.userId}});
}

type SignUpResult = {
  errors: {
    username?: string[] | string | undefined;
    password?: string[] | string | undefined;
    secretQuestion?: string[] | string | undefined;
    secretAnswer?: string[] | string | undefined;
  };
} & TSignUpSchema;

export async function signUp(_prevState: SignUpResult, formData: FormData): Promise<SignUpResult> {
  const inputData = Object.fromEntries(formData) as TSignUpSchema;
  const result = SignUpSchema.safeParse(inputData);
  if (!result.success) {
    return {
      ...inputData,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({where: {username: result.data.username}});
  if (existingUser) {
    return {
      ...inputData,
      errors: {
        username: "Username already taken, try another one"
      }
    }
  }

  const salt = await generateSalt();
  const hashedPassword = await hash(result.data.password, salt);
  const hashedSecretAnswer = await hash(result.data.secretAnswer, salt);

  const user = await prisma.user.create({
    data: {
      ...result.data,
      salt,
      password: hashedPassword,
      secretAnswer: hashedSecretAnswer
    }
  });

  await createSession({
    userId: user.id,
  })

  redirect("/chat")
}

type LoginResult = {
  errors: {
    username?: string[] | string | undefined;
    password?: string[] | string | undefined;
  };
} & TLoginSchema;

export async function login(prevState: LoginResult, formData: FormData): Promise<LoginResult> {
  const inputData = Object.fromEntries(formData) as TLoginSchema;
  const result = LoginSchema.safeParse(inputData);
  if (!result.success) {
    return {
      ...inputData,
      errors: result.error.flatten().fieldErrors,
    }
  }
  const user = await prisma.user.findUnique({where: {username: result.data.username}});
  if (!user) {
    return {
      ...inputData,
      errors: {
        username: "Invalid username or password",
        password: "Invalid username or password"
      }
    }
  }
  const isPasswordCorrect = await compare(result.data.password, user.password, user.salt);
  if (!isPasswordCorrect) {
    return {
      ...inputData,
      errors: {
        username: "Invalid username or password",
        password: "Invalid username or password"
      }
    }
  }

  await createSession({
    userId: user.id,
  })

  redirect("/chat")
}

export async function logout() {
  await removeSession();
  redirect("/auth")
}
