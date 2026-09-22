import React from 'react';
import { ShieldAlert, Radio, Calendar, Download, Archive, RefreshCw, Sparkles } from 'lucide-react';

export default function Navbar({ 
  report, 
  onRefresh, 
  isRefreshing, 
  onOpenArchive,
  activeTab,
  setActiveTab
}) {
  const threatScore = report?.threatMeter?.overallScore || 8.5;
  const threatLevel = report?.threatMeter?.level || "Yüksek";

  const getThreatColor = (score) => {
    if (score >= 8.5) return "text-rose-400 bg-rose-950/60 border-rose-800/80";
    if (score >= 7.0) return "text-amber-400 bg-amber-950/60 border-amber-800/80";
    return "text-emerald-400 bg-emerald-950/60 border-emerald-800/80";
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Sol: Logo ve Terminal Başlığı */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-950/50">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  AML TEKNO RADAR
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 font-semibold tracking-wide">
                    PRO
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-mono flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Finansal Suçlar & AI Zeka Terminali
              </p>
            </div>
          </div>

          {/* Mobil Görünüm İçin Hızlı Tehdit Rozeti */}
          <div className={`md:hidden px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${getThreatColor(threatScore)}`}>
            {threatScore}/10 • {threatLevel}
          </div>
        </div>

        {/* Orta/Sağ: Durum Bilgileri ve Aksiyonlar */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          
          {/* Tehdit Metresi (Masaüstü) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-slate-900/60 border-slate-800 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Küresel Tehdit:</span>
            <div className={`px-2 py-0.5 rounded border text-[11px] font-mono font-bold ${getThreatColor(threatScore)}`}>
              {threatScore} / 10 • {threatLevel}
            </div>
          </div>

          {/* Tarih Rozeti */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{report?.date || "22 Eylül 2026"}</span>
          </div>

          {/* Geçmiş Arşiv Butonu */}
          <button
            onClick={onOpenArchive}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 text-xs font-medium transition cursor-pointer"
            title="Geçmiş Raporları İncele"
          >
            <Archive className="w-3.5 h-3.5 text-slate-400" />
            <span>Arşiv</span>
          </button>

          {/* Yenile / Canlı Veri Çekme Butonu */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 border border-emerald-300 transition shadow-sm cursor-pointer ${
              isRefreshing ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Taranıyor..." : "Verileri Güncelle"}</span>
          </button>
        </div>

      </div>

      {/* Navigasyon Sekmeleri */}
      <div className="max-w-7xl mx-auto mt-3.5 pt-2 border-t border-slate-800/60 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: "radar", label: "Günün Radarı", icon: ShieldAlert },
          { id: "ideas", label: "Zekice AML Fikirleri & Reçeteler", icon: Sparkles, count: report?.actionableIdeas?.length },
          { id: "arxiv", label: "Akademik Ar-Ge & RegTech (arXiv)", count: report?.arxivHighlights?.length },
          { id: "community", label: "Saha & Topluluk Nabzı (X & Reddit)" },
          { id: "newsletter", label: "E-Posta Bülteni" }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isActive ? "bg-emerald-800/80 text-emerald-200" : "bg-slate-800 text-slate-400"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
