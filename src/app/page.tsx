'use server';
import { checkAuth } from '@/api/auth';
import { redirect } from 'next/navigation';

export default async function MainPage() {
    const auth = await checkAuth();
    if (auth) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }
}