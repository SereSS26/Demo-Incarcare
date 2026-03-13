import React from 'react';
import Sidebar from '@/app/components/dashboard/Sidebar';
import { DashboardProvider } from '@/lib/context/DashboardContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Învelim totul în Provider-ul nostru care ține datele în memorie
    <DashboardProvider>
      <div className="flex min-h-screen bg-[#030303] text-white selection:bg-fuchsia-600 selection:text-white overflow-hidden">
        
        <Sidebar />

        <div className="flex-1 relative h-screen overflow-hidden">
          {children}
        </div>
        
      </div>
    </DashboardProvider>
  );
}