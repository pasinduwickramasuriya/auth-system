// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export async function hashPassword(password: string): Promise<string> {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
//   } catch (error) {
//     throw new Error('Error hashing password');
//   }
// }

// export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
//   try {
//     return await bcrypt.compare(password, hashedPassword);
//   } catch (error) {
//     throw new Error('Error verifying password');
//   }
// }

// export function generateToken(user: { _id: string; email: string }): string {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error('JWT_SECRET is not defined in the environment');
//   }
//   return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });
// }


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch {
    throw new Error('Error hashing password');
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch {
    throw new Error('Error verifying password');
  }
}

export function generateToken(user: { _id: string; email: string }): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment');
  }
  return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });
}