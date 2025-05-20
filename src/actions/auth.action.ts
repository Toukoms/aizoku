"use server"
import { compare, generateSalt, hash } from "@/src/lib/crypt";
import { prisma } from "@/src/lib/prisma";
import { createSession, getSession, removeSession } from "@/src/lib/session";
import { GetByUserNameSchema, LoginSchema, SignUpSchema, TGetByUserNameSchema, TLoginSchema, TResetPasswordSchema, TSignUpSchema } from "@/src/schema/auth.schema";
import { redirect } from "next/navigation";
import { User } from "../generated/prisma/client";

type SignUpResult = {
  errors: {
    username?: string[] | string | undefined;
    password?: string[] | string | undefined;
    secretQuestion?: string[] | string | undefined;
    secretAnswer?: string[] | string | undefined;
  };
} & TSignUpSchema;

type LoginResult = {
  errors: {
    username?: string[] | string | undefined;
    password?: string[] | string | undefined;
  };
} & TLoginSchema;

type ResetPasswordResult = {
  errors: {
    newPassword?: string[] | string | undefined;
    confirmNewPassword?: string[] | string | undefined;
  };
} & TResetPasswordSchema;


// ------- Functions -------

/**
 * Retrieves the current user session.
 * @returns {Promise<User | null>} The user object if a session exists, or null if no session is found.
 */
export async function getUserSession(): Promise<User | null> {
  const session = await getSession();
  return prisma.user.findUnique({where: {id: session?.userId}});
}


/**
 * Handles user sign-up process.
 * @param {SignUpResult} _prevState - Previous state (unused).
 * @param {FormData} formData - Form data containing user sign-up information.
 * @returns {Promise<SignUpResult>} Result of the sign-up process, including any errors.
 */
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

  const salt = generateSalt();
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


/**
 * Handles user login process.
 * @param {LoginResult} prevState - Previous login state.
 * @param {FormData} formData - Form data containing login credentials.
 * @returns {Promise<LoginResult>} Result of the login process, including any errors.
 */
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

/**
 * Handles user logout process.
 * Removes the current session and redirects to the authentication page.
 */
export async function logout() {
  await removeSession();
  redirect("/auth")
}

type TGetByUserNameResult = {
  errors?: {
    username?: string;
  };
  secretQuestion?: string;
  salt?: string;
  secretAnswer?: string;
} & Partial<TGetByUserNameSchema>;

export async function checkUserName(usernameInput: string): Promise<TGetByUserNameResult> {
  try {
    const inputData = {username: usernameInput} as TGetByUserNameSchema;
    const result = GetByUserNameSchema.safeParse(inputData);
    if (!result.success) {
      return {
        ...inputData,
        errors: {
          username: result.error.flatten().fieldErrors.username?.[0] || "Invalid username"
        },
      }
    }
    const username = result.data.username;
    const user = await prisma.user.findUniqueOrThrow({where: {
      username,
    }, select: {
      id: true,
      username: true,
      secretQuestion: true,
      salt: true,
      secretAnswer: true,
    }})
    return {...user};
  } catch(err) {
    return {errors: {username: "User not found"}}
  }
}

export async function checkSecretAnswer(username: string, secretAnswer: string) {
  const user = await prisma.user.findUnique({where: {username}});
  if (!user) {
    return {errors: {user: "User not found"}, success: false};
  }
  const isSecretAnswerCorrect = await compare(secretAnswer, user.secretAnswer, user.salt);
  if (!isSecretAnswerCorrect) {
    return {errors: {secretAnswer: "Invalid secret answer"}, success: false};
  }
  return {success: true};
}

export async function resetPassword(username: string, newPassword: string) {
  const user = await prisma.user.findUnique({where: {username}});
  if (!user) {
    return {errors: {user: "User not found"}, success: false};
  }
  const hashedPassword = await hash(newPassword, user.salt);
  await prisma.user.update({where: {username}, data: {password: hashedPassword}});
  return {success: true};
}
