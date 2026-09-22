import React from 'react';
import { BookOpen, ExternalLink, FileText, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

export default function ArxivResearchSheet({ papers = [] }) {
  return (
    <div className="space-y-6">
      
      {/* Başlık ve Açıklama */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-indigo-400 mb-1">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold">Akademik Ar-Ge & RegTech Laboratuvarı</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          arXiv FinCrime Makaleleri & Bankacılık Çözümlemeleri
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Dünyanın önde gelen yapay zeka araştırmacılarının son 24-48 saatte yayınladığı kara para aklama, grafik sinir ağları (GNN) ve fraud makalelerinin bankacılık pratiğine uyarlanmış özetleri.
        </p>
      </div>

      {/* Makale Listesi */}
      <div className="grid grid-cols-1 gap-5">
        {papers.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 text-slate-500 text-sm">
            Bugün için öne çıkan akademik makale bulunamadı.
          </div>
        ) : (
          papers.map((paper, index) => (
            <div
              key={paper.id || index}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 transition p-6"
            >
              {/* Üst Bilgi Satırı */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-md border border-indigo-800/60">
                    arXiv:{paper.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Yazarlar: {(paper.authors || []).join(", ")}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <a
                    href={paper.arxivUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                  >
                    <span>Özet (Abstract)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  {paper.pdfUrl && (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 transition"
                    >
                      <FileText className="w-3 h-3" />
                      <span>PDF</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Orijinal Makale Başlığı */}
              <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                {paper.title}
              </h3>

              {/* İki Kolonlu Çözümleme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Yönetici Çıkarımı */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>YÖNETİCİ & TEKNİK ÇIKARIM</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {paper.executiveTakeaway}
                  </p>
                </div>

                {/* 2. Bankada Nasıl Uygulanır? */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>BANKA & UYUM OPERASYONUNA UYARLAMA</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {paper.bankImplementationGuide}
                  </p>
                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
