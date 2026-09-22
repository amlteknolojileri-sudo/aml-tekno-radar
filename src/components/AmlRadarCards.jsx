import React from 'react';
import { AlertTriangle, TrendingUp, Building2, Cpu, Coins, ShieldCheck, ArrowUpRight, Flame } from 'lucide-react';

export default function AmlRadarCards({ report, onExploreIdeas }) {
  const flash = report?.morningBrief?.flashAlert || {};
  const macros = report?.morningBrief?.macroDevelopments || [];
  const threatMeter = report?.threatMeter || {};

  const getMacroIcon = (category) => {
    if (category.includes("Regülasyon") || category.includes("Yaptırım")) return Building2;
    if (category.includes("Teknoloji") || category.includes("Anomali")) return Cpu;
    return Coins;
  };

  return (
    <div className="space-y-6">
      
      {/* 🚨 1. BÖLÜM: FLAŞ TEHDİT & TEHDİT METRESİ KOMBİNASYONU */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Flaş Uyarı Kartı (2 Kolon) */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-rose-900/60 bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-slate-950 p-6 shadow-xl shadow-rose-950/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                Günün Flaş Uyarısı
              </span>
            </div>
            {flash.tag && (
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                {flash.tag}
              </span>
            )}
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
            {flash.title || "Kritik AML Tehdidi Belirlenmedi"}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            {flash.description || "Son 24 saat içinde olağandışı bir kriz sinyali alınmadı."}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80">
            <button
              onClick={onExploreIdeas}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-400 text-slate-950 transition cursor-pointer shadow-lg shadow-rose-950/40"
            >
              <span>Karşı Tedbirleri & Zekice Fikirleri Gör</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              ⚡ Etki Alanı: İşlem İzleme, Banka & Kripto VASP
            </span>
          </div>
        </div>

        {/* Tehdit Metresi ve İstatistik Kutusu (1 Kolon) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Küresel Risk Skoru</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800/60">
                {threatMeter.level || "Yüksek Tehdit"}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-black font-mono tracking-tight text-white">
                {threatMeter.overallScore || 8.8}
              </span>
              <span className="text-slate-500 font-mono text-lg">/ 10</span>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-4 p-0.5">
              <div 
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${((threatMeter.overallScore || 8.8) / 10) * 100}%` }}
              ></div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {threatMeter.summary || "Kripto mikserler, FAST parçalaması ve sentetik kimlikler bugün yüksek alarm seviyesinde."}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
              <div className="text-lg font-bold font-mono text-white">{threatMeter.activeAlertsCount || 14}</div>
              <div className="text-[10px] text-slate-400 uppercase">Aktif Alarm</div>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
              <div className="text-lg font-bold font-mono text-emerald-400">%94</div>
              <div className="text-[10px] text-slate-400 uppercase">GNN Doğruluğu</div>
            </div>
          </div>
        </div>

      </div>

      {/* 📋 2. BÖLÜM: YÖNETİCİ ÖZETİ (EXECUTIVE SUMMARY) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
            Günün AML & FinCrime Yönetici Brifingi
          </h3>
        </div>
        <div className="text-sm text-slate-300 leading-relaxed space-y-3 font-normal">
          {(report?.executiveSummary || "").split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* 🌐 3. BÖLÜM: MAKRO GELİŞMELER & TRENDLER */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
              Makro Sektör & Regülasyon Kırılmaları
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Son 24 Saat Analizi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {macros.map((item, index) => {
            const Icon = getMacroIcon(item.category);
            return (
              <div 
                key={index}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 transition p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 group-hover:bg-emerald-950/80 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
