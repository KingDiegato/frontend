'use client';
import { FormEvent, useState } from 'react';
import { Login } from '../components/login';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

export default function LogPage() {
  const [error, setError] = useState<string>();
  const routing = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(data.entries());
    try {
      if (
        credentials?.identifier.length < 3 &&
        credentials?.password.length < 3
      ) {
        throw new Error('Las credenciales deben tener almenos 3 caracteres');
      }
      const response = await axios.post('/api/enter', credentials);
      const { username } = response.data.user;
      const res = await signIn('credentials', {
        identifier: username,
        password: data.get('password'),
        redirect: false
      });
      if (res?.ok) {
        toast.success('Inicio de sesión exitoso');
        routing.push('/dashboard');
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Usuario o contraseña incorrectos');
        setError('Usuario o contraseña incorrectos');
      }
    }
  };

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '5rem',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Login />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <Toaster richColors />
    </main>
  );
}
