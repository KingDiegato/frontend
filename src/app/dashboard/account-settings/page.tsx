'use client';

import { useSession } from 'next-auth/react';

export default function AccountSettings() {
  const sessionData = useSession();
  console.log(sessionData);
  return (
    <div>
      <h1>Account Settings</h1>
    </div>
  );
}
