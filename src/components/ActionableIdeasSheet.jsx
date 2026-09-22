import React, { useState } from 'react';
import { Sparkles, Copy, Check, Filter, Search, Terminal, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ActionableIdeasSheet({ ideas = [] }) {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Tümü", ...new Set(ideas.map(i => i.category).filter(Boolean))];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredIdeas = ideas.filter(item => {
    const matchesCategory = selectedCategory === "Tümü" || item.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (badge) => {
    if (badge?.includes("Kritik")) return "bg-rose-950/80 text-rose-300 border-rose-800/60";
    if (badge?.includes("Yüksek Verim")) return "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
    if (badge?.includes("Hızlı")) return "bg-amber-950/80 text-amber-300 border-amber-800/60";
    return "bg-sky-950/80 text-sky-300 border-sky-800/60";
  };

  return (
    <div className="space-y-6">
      
      {/* Başlık ve Açıklama */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-bold">Stratejik Zeka & Aksiyon Havuzu</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            AML Ekipleri İçin Zekice Fikirler & Reçeteler
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Mali suçlarla mücadele ve uyum operasyonlarında analistlerin doğrudan kullanabileceği hazır LLM promptları, anomali kural mantıkları ve savunma taktikleri.
          </p>
        </div>

        {/* Arama Çubuğu */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Fikir veya kural ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Kategori Filtre Butonları */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Fikir Kartları Listesi */}
      <div className="grid grid-cols-1 gap-6">
        {filteredIdeas.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 text-slate-500 text-sm">
            Aradığınız kritere uygun fikir bulunamadı.
          </div>
        ) : (
          filteredIdeas.map((idea, index) => (
            <div
              key={idea.id || index}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 transition p-6 flex flex-col justify-between"
            >
              <div>
                {/* Üst Kategori ve Rozet */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800/60">
                      #{index + 1} {idea.category}
                    </span>
                    {idea.badge && (
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${getBadgeColor(idea.badge)}`}>
                        {idea.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hemen Uygulanabilir</span>
                  </div>
                </div>

                {/* Başlık */}
                <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                  {idea.title}
                </h3>

                {/* Problem vs Çözüm İkili Kutusu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[11px] font-mono uppercase font-bold text-rose-400 block mb-1">
                      ⚠️ Operasyonel Acı Noktası (Problem)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {idea.problem}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[11px] font-mono uppercase font-bold text-emerald-400 block mb-1">
                      💡 Zekice Çözüm Yaklaşımı
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {idea.solution}
                    </p>
                  </div>
                </div>

                {/* Hazır Prompt / Kural Mantığı Kutusu */}
                {idea.promptOrLogic && (
                  <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 mb-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Kopyalanabilir Prompt / Anomali Kodu:</span>
                      </div>
                      <button
                        onClick={() => handleCopy(idea.id, idea.promptOrLogic)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer text-[11px]"
                      >
                        {copiedId === idea.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto text-[11px] max-h-56 overflow-y-auto pr-2">
                      {idea.promptOrLogic}
                    </pre>
                  </div>
                )}
              </div>

              {/* Alt Bilgi: Beklenen Etki */}
              <div className="pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-slate-300">Beklenen Ölçülebilir Etki:</span>
                  <span className="text-slate-200 font-mono text-[11px]">{idea.expectedImpact}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
