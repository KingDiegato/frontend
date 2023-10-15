'use client';
import { MiniDrawer } from '../components/drawer';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MiniDrawer>{children}</MiniDrawer>
    </>
  );
}
