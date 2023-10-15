import Link from 'next/link';

async function getPresupuestos() {
  try {
    const res = await fetch(`${process.env.API_URL}/presupuestos`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const { data } = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function Home() {
  const presupuestos = await getPresupuestos();
  return (
    <main>
      <Link href="/dashboard"> go to dashboard </Link>
      <pre>{JSON.stringify(presupuestos && presupuestos)}</pre>
    </main>
  );
}
