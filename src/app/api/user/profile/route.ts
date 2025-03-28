import { connectToDatabase } from '@/lib/db';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET as string) as { id: string; email: string };
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { email: decoded.email },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }
    console.error('Profile error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
