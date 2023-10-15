import axios from 'axios';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await axios.post(
      `${process.env.API_URL}/auth/local`, // 127.0.0.1 => localhost
      body
    );
    return NextResponse.json(res.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  return new Response('Hello, Next.js!');
}
