'use client';
import { JSX, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export default function LoginPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [router]);

  return <section className='mt-11'> <LoginForm /></section>;
}