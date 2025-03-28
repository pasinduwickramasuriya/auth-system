'use client';
import { JSX, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard'); // Redirect to dashboard if user is logged in
    }
  }, [router]);

  return <section className='mt-11'><RegisterForm /></section>;
}