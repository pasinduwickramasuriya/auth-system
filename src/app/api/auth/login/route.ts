import { connectToDatabase } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password }: LoginRequest = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken({ _id: user._id.toString(), email: user.email });
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}