import React from 'react';
import { MessageSquare, Flame, TrendingUp, AlertCircle, Building2, ThumbsUp, ThumbsDown, ArrowUpRight } from 'lucide-react';

export default function CommunityPulseSheet({ typologies = [], communityPulse = {} }) {
  const painPoints = communityPulse.analystPainPoints || [];
  const vendors = communityPulse.vendorRadar || [];

  const getTrendBadge = (trend) => {
    if (trend === "skyrocketing") return "text-rose-400 bg-rose-950/80 border-rose-800/60";
    if (trend === "rising") return "text-amber-400 bg-amber-950/80 border-amber-800/60";
    return "text-slate-400 bg-slate-900 border-slate-800";
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment === "Pozitif" || sentiment === "Yükselişte") return "text-emerald-400 bg-emerald-950/60 border-emerald-800/60";
    if (sentiment === "Eleştiriliyor") return "text-rose-400 bg-rose-950/60 border-rose-800/60";
    return "text-amber-400 bg-amber-950/60 border-amber-800/60";
  };

  return (
    <div className="space-y-8">
      
      {/* ⚡ 1. BÖLÜM: YÜKSELEN AKLAMA TİPOLOJİLERİ MATRİSİ */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Tehdit & Tipoloji Radarı</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Son 24 Saatin Yükselen Aklama & Suç Modelleri
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Reddit, X ve küresel adli olaylardan süzülen en tehlikeli para aklama yöntemleri ve anomali filtreleme taktikleri.
            </p>
          </div>
        </div>

        {/* Tablo */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-3 px-4">Tipoloji / Suç Deseni</th>
                <th className="py-3 px-4">Hedef Sektör</th>
                <th className="py-3 px-4 text-center">Risk Skoru</th>
                <th className="py-3 px-4 text-center">Trend (Delta)</th>
                <th className="py-3 px-4">Önerilen Tespit Filtresi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {typologies.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition">
                  <td className="py-3.5 px-4 font-bold text-white text-sm">
                    {t.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                    {t.targetSector}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                      {t.riskScore} / 10
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getTrendBadge(t.trend)}`}>
                      {t.delta}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 text-xs">
                    {t.detectionTactic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🗣️ 2. BÖLÜM: SAHA NABZI & YAZILIM DEĞERLENDİRMELERİ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sol Kolon: Analist Acı Noktaları (Reddit / X) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex items-center gap-2 mb-4 text-amber-400">
            <MessageSquare className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
              Analist Masası: Sahadaki En Büyük Şikayetler
            </h3>
          </div>

          <div className="space-y-3">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Kolon: AML Yazılım & Vendor Radarı */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex items-center gap-2 mb-4 text-sky-400">
            <Building2 className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
              RegTech & AML Vendor Radarı
            </h3>
          </div>

          <div className="space-y-3">
            {vendors.map((vendor, index) => (
              <div 
                key={index}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-white">{vendor.name}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getSentimentColor(vendor.sentiment)}`}>
                    {vendor.sentiment}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {vendor.topic}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
