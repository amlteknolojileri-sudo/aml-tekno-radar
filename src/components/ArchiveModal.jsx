import React from 'react';
import { X, Calendar, ShieldAlert, ArrowRight } from 'lucide-react';

export default function ArchiveModal({ isOpen, onClose, archiveList = [], onSelectDate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 overflow-hidden">
        
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Başlığı */}
        <div className="flex items-center gap-2 text-emerald-400 mb-1">
          <Calendar className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold">Geçmiş Yayınlar</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          AML Tekno Radar Arşivi
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Önceki günlerin finansal suç istihbaratını ve bültenlerini inceleyin.
        </p>

        {/* Liste */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {archiveList.map((item, index) => (
            <div
              key={item.isoDate || index}
              onClick={() => {
                onSelectDate(item.isoDate);
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-800/60 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-white">
                    {item.date}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-400 border border-rose-800/50">
                    Risk: {item.threatScore}/10
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 group-hover:text-slate-200 transition">
                  {item.flashTitle}
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
