'use client';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  session ? console.log(session, status) : null;
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This might be protected</p>
    </div>
  );
}
