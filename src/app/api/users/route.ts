import { connectToDatabase } from '@/lib/db';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Verify JWT token
    verify(token, process.env.JWT_SECRET as string);

    const { db } = await connectToDatabase();
    const users = await db
      .collection('users')
      .find({}, { projection: { password: 0 } })
      .toArray();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }
    console.error('Users fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}