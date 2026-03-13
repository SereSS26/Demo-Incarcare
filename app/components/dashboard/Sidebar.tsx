"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- Noul nostru prieten pentru rute
import { LayoutDashboard, Dumbbell, Utensils, User, Settings, LogOut } from 'lucide-react';

function SidebarLink({ icon, text, href }: { icon: React.ReactNode, text: string, href: string }) {
  const pathname = usePathname();
  
  // Verificăm dacă URL-ul curent se potrivește cu link-ul butonului
  const active = pathname === href;

  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
      active ? 'bg-fuchsia-600/10 text-fuchsia-600' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}>
      {icon}
      {text}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-white/[0.02] p-6 justify-between relative z-20">
      <div>
        <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
          <div className="bg-fuchsia-600 p-1.5 rounded-lg">
            <LayoutDashboard className="text-black" size={20} />
          </div>
          <span className="text-xl font-black tracking-tight">Queen&King Cardio</span>
        </Link>

        {/* Nu mai avem nevoie să trimitem manual "active"! Se calculează singur în SidebarLink */}
        <nav className="space-y-4">
          <SidebarLink href="/dashboard" icon={<LayoutDashboard size={18} />} text="Overview" />
          <SidebarLink href="/dashboard/antrenamente" icon={<Dumbbell size={18} />} text="Antrenamente" />
          <SidebarLink href="/dashboard/nutritie" icon={<Utensils size={18} />} text="Plan Nutriție" />
          <SidebarLink href="/dashboard/progres" icon={<User size={18} />} text="Progresul Meu" />
        </nav>
      </div>

      <div className="space-y-4 pt-8 border-t border-white/5">
        <SidebarLink href="/setari" icon={<Settings size={18} />} text="Setări" />
        <SidebarLink href="/logout" icon={<LogOut size={18} />} text="Deconectare" />
      </div>
    </aside>
  );
}