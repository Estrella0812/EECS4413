"use client";

interface PopupProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function Popup({ isOpen, message, onClose }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            {message}
          </h3>

          <button
            onClick={onClose}
            className="w-full mt-2 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all active:scale-[0.98]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}