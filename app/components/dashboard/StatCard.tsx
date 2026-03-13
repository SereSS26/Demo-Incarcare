import React from 'react';

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtext: string;
  highlight?: boolean;
};

export default function StatCard({ icon, title, value, subtext, highlight = false }: StatCardProps) {
  return (
    <div className={`p-6 rounded-3xl border transition-all ${highlight ? 'bg-fuchsia-600/10 border-fuchsia-600/30' : 'bg-white/5 border-white/10'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-black/30 p-2 rounded-lg">{icon}</div>
        <h4 className="text-gray-400 text-sm font-semibold">{title}</h4>
      </div>
      <h2 className="text-3xl font-black tracking-tighter mb-1">{value}</h2>
      <p className="text-sm font-medium text-gray-500">{subtext}</p>
    </div>
  );
}