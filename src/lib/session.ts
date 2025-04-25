import "server-only"
import {EncryptJWT, jwtDecrypt} from "jose";
import {cookies} from "next/headers";
import {UserPayload} from "@/src/types/user.type";

const secretKey = process.env.AUTH_SECRET_KEY as string;
const key = new TextEncoder().encode(secretKey).slice(0, 32);

async function encrypt(payload: UserPayload) {
  return await new EncryptJWT(payload)
    .setProtectedHeader({alg: "dir", enc: "A256GCM"})
    .setIssuedAt()
    .setExpirationTime("24h")
    .encrypt(key);
}

export async function decrypt(token: string) {
  try {
    const {payload} = await jwtDecrypt(token, key);
    return payload as UserPayload;
  } catch (err) {
    console.error("JWT verification error:", err);
    await removeSession();
    return null;
  }
}

export async function createSession(user: UserPayload) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(user);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {httpOnly: true, secure: true, sameSite: true, expires});
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")
  if (!session) return null;
  return await decrypt(session.value)
}
