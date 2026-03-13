"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Activity, Droplets } from 'lucide-react';

// Aici definim ce "unelte" (date și funcții) așteaptă componenta de la pagina mare
interface StatsBentoGridProps {
  totalCalories: number;
  mealsCount: number;
  totalProteins: number;
  currentWater: number;
  isSavingWater: boolean;
  handleCalorieClick: () => void;
  handleProteinClick: () => void;
  handleWaterClick: () => void;
  handleDrinkWater: (e: React.MouseEvent) => void;
}

export default function StatsBentoGrid({
  totalCalories,
  mealsCount,
  totalProteins,
  currentWater,
  isSavingWater,
  handleCalorieClick,
  handleProteinClick,
  handleWaterClick,
  handleDrinkWater
}: StatsBentoGridProps) {
  
  // Animațiile pentru a face cardurile să apară frumos
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } } };

  return (
    <motion.div className="xl:col-span-7 grid grid-cols-2 grid-rows-2 gap-4 h-full" initial="hidden" animate="show" variants={containerVariants}>
      
      {/* 1. CARD CALORII */}
      <motion.div 
        variants={itemVariants} onClick={handleCalorieClick}
        className="cursor-pointer row-span-2 col-span-1 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[32px] p-8 flex flex-col justify-between backdrop-blur-md hover:border-fuchsia-600/30 transition-colors group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-all" />
        <div className="relative z-10">
          <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Flame className="text-fuchsia-600" size={24} />
          </div>
          <h3 className="text-gray-400 font-medium mb-1">Calorii Consumate</h3>
          <div className="flex items-baseline gap-2 mb-2 text-white">
            <span className="text-5xl font-bold tracking-tighter">{totalCalories}</span>
            <span className="text-gray-500 font-medium">kcal</span>
          </div>
          <span className="text-fuchsia-600 text-sm font-semibold">Obiectiv: 2500 kcal</span>
        </div>
        
        <div className="mt-8 relative z-10">
           <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-fuchsia-500" 
               initial={{ width: 0 }} animate={{ width: `${Math.min((totalCalories / 2500) * 100, 100)}%` }} transition={{ duration: 1 }}
             />
           </div>
           <p className="text-xs text-gray-400 mt-2">{mealsCount} mese adăugate azi</p>
        </div>
      </motion.div>

      {/* 2. CARD PROTEINE */}
      <motion.div 
        variants={itemVariants} onClick={handleProteinClick}
        className="cursor-pointer bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col justify-center backdrop-blur-md hover:border-blue-500/30 transition-colors group relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-500/20 text-blue-400 p-2.5 rounded-xl group-hover:bg-blue-500/30 transition-colors">
            <Activity size={20} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full">Proteine</span>
        </div>
        <div className="flex items-end gap-2 text-white">
          <span className="text-4xl font-bold tracking-tighter">{totalProteins}</span>
          <span className="text-gray-500 mb-1">g / 160g</span>
        </div>
        <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden relative">
          <motion.div 
            className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out absolute left-0 top-0" 
            initial={{ width: 0 }} animate={{ width: `${Math.min((totalProteins / 160) * 100, 100)}%` }}
          />
        </div>
      </motion.div>

      {/* 3. CARD APĂ */}
      <motion.div 
        variants={itemVariants} onClick={handleWaterClick}
        className="cursor-pointer bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col justify-center backdrop-blur-md hover:border-cyan-500/30 transition-colors group relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-cyan-500/20 text-cyan-400 p-2.5 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
            <Droplets size={20} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full">Hidratare</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-2 text-white">
            <span className="text-4xl font-bold tracking-tighter">{currentWater}</span>
            <span className="text-gray-500 mb-1">/ 8 pahare</span>
          </div>
          <button 
            onClick={handleDrinkWater}
            disabled={isSavingWater || currentWater >= 8}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              currentWater >= 8 ? 'bg-cyan-500/20 text-cyan-500 cursor-not-allowed' : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            }`}
          >
            <span className="text-xl font-bold leading-none">+</span>
          </button>
        </div>
      </motion.div>

    </motion.div>
  );
}