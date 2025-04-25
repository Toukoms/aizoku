import crypto from "crypto"

export async function hash(password: string, salt: string): Promise<string> {
  return new Promise((resolve, error) => {
    crypto.scrypt(password, salt, 64, (err, hash) => {
      if (err || !hash) error(err)
      resolve(hash.toString("hex").normalize())
    })
  })
}

export function generateSalt() {
  return crypto.randomBytes(32).toString("hex").normalize()
}

export async function compare(password: string, hashedPassword: string, salt: string) {
  const inputHashedPassword = await hash(password, salt);
  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword),
    Buffer.from(hashedPassword)
  );
}
