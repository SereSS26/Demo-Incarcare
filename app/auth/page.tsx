"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// --- SCHEMELE DE VALIDARE (ZOD) ---
const loginSchema = z.object({
  email: z.string().email("Introdu o adresă de email validă"),
  password: z.string().min(6, "Parola trebuie să aibă minim 6 caractere"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(3, "Numele trebuie să aibă minim 3 caractere"),
});

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Toggle între Login și Creare Cont
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Setup pentru formular (comută schema în funcție de starea isLogin)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg("");
    reset(); // Curăță inputurile când schimbi modul
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        // --- LOGICA DE LOGARE ---
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        router.push('/dashboard'); // Dacă logarea e ok, merge pe Dashboard
      } else {
        // --- LOGICA DE CREARE CONT ---
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: { full_name: data.name } // Salvăm numele în metadata Supabase
          }
        });
        if (error) throw error;
        
        // Dacă s-a creat contul cu succes, îl trimitem la Onboarding (pagină completare date)
        router.push('/onboarding');
      }
    } catch (error: any) {
      setErrorMsg(error.message || "A apărut o eroare de conectare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Buton Înapoi la Home */}
      <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 z-20">
        ← Acasă
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-8 sm:p-10 rounded-[32px] backdrop-blur-xl relative z-10 shadow-2xl shadow-black/50"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            {isLogin ? "Bine ai revenit" : "Începe călătoria"}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            {isLogin ? "Loghează-te pentru a-ți accesa dashboard-ul." : "Creează un cont pentru a-ți atinge potențialul."}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-6 text-center">
            {errorMsg === "Invalid login credentials" ? "Email sau parolă incorecte." : errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Input Nume (Doar la înregistrare) */}
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <UserIcon size={14}/> Numele tău
                </label>
                <input 
                  {...register("name")} 
                  placeholder="Ex: Artur Ionescu" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" 
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message?.toString()}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Email */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Mail size={14}/> Adresa de Email
            </label>
            <input 
              {...register("email")} 
              type="email"
              placeholder="Ex: salut@email.com" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" 
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message?.toString()}</p>}
          </div>

          {/* Input Parolă */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Lock size={14}/> Parolă
            </label>
            <input 
              {...register("password")} 
              type="password"
              placeholder="••••••••" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" 
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message?.toString()}</p>}
          </div>

          {/* Buton Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? "Conectare" : "Creează Cont"} <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Nu ai cont încă?" : "Ai deja un cont creat?"}{" "}
            <button 
              onClick={toggleMode} 
              type="button"
              className="text-fuchsia-500 font-bold hover:underline"
            >
              {isLogin ? "Înregistrează-te" : "Loghează-te aici"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}