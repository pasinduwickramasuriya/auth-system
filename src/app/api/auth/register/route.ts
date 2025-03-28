import { connectToDatabase } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

interface RegisterRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { fullName, phoneNumber, email, password, confirmPassword }: RegisterRequest = await req.json();

    if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      return NextResponse.json({ message: 'Phone number must be 10 digits' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const result = await db.collection('users').insertOne({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Registration successful', userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}