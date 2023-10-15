import { AuthOptions } from '@/app/lib/authOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = getServerSession(AuthOptions);

  return NextResponse.json({
    authenticated: !!session,
    session: session
  });

  // const promise = await axios.get(`${process.env.API_URL}/productos`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });
}
