import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  pulse?: boolean;
}

export default function Logo({ className = "h-24 w-24", showText = true, pulse = false }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${showText ? 'gap-4' : ''}`}>
      <motion.div
        className={`relative ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`w-full h-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950/80 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/10 ${pulse ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse' : ''}`}>
          <img 
            src="/logo_visuall.jpg" 
            alt="VisuALL Logo" 
            className="w-full h-full object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {showText && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-sans tracking-[0.25em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-cyan-200 to-white drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)] uppercase select-none">
            VisuALL
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-[1px] w-6 md:w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <p className="text-[10px] md:text-xs font-sans tracking-[0.3em] font-semibold text-cyan-400 uppercase">
              Criatividade que gera resultados
            </p>
            <span className="h-[1px] w-6 md:w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
