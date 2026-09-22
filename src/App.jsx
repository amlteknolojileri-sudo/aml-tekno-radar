import React, { useState, useMemo } from 'react';
import { CATEGORY_DEFINITIONS, MOCK_TOOLS_DATA, DEFAULT_AML_GLOSSARY } from './data/mockData.js';
import latestReportData from './data/latest-aml-report.json';
import archiveIndexData from './data/archive-index.json';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  History,
  FileSpreadsheet,
  Filter,
  Info,
  Calendar,
  ExternalLink,
  BookOpen,
  Sparkles,
  Terminal,
  Coffee,
  Copy,
  Check,
  BookMarked,
  Cpu,
  Clock,
  Zap,
  X,
  Search,
  Mail,
  Send,
  ShieldAlert,
  Flame,
  Download,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [timeframe, setTimeframe] = useState('daily'); // 'daily' | 'weekly' | 'monthly' | 'report' | 'ideas' | 'arxiv' | 'glossary'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [isBriefExpanded, setIsBriefExpanded] = useState(true);
  const [copiedCmdId, setCopiedCmdId] = useState(null);
  const [isSystemInfoOpen, setIsSystemInfoOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedDateId, setSelectedDateId] = useState('latest');
  const [copiedMd, setCopiedMd] = useState(false);

  const report = latestReportData;

  // Modeller / Tipolojiler Listesi
  const toolsList = useMemo(() => {
    return MOCK_TOOLS_DATA.daily || [];
  }, []);

  const filteredTools = useMemo(() => {
    if (selectedCategory === 'all') return toolsList;
    return toolsList.filter(t => t.category === selectedCategory);
  }, [toolsList, selectedCategory]);

  const selectedTool = useMemo(() => {
    if (!expandedId) return null;
    return toolsList.find(t => t.id === expandedId) || null;
  }, [toolsList, expandedId]);

  const avgHypeScore = useMemo(() => {
    if (!filteredTools.length) return '0.0';
    const sum = filteredTools.reduce((acc, t) => acc + (t.hypeScore || 0), 0);
    return (sum / filteredTools.length).toFixed(1);
  }, [filteredTools]);

  const handleCopyCmd = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmdId(id);
    setTimeout(() => setCopiedCmdId(null), 2500);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setSubscribeMessage('Bültene başarıyla abone oldunuz! İlk bülteniniz yarın sabah 06:00\'da iletilecektir.');
    }, 1200);
  };

  const handleCopyMarkdown = () => {
    const mdText = `# 🛡️ AML TEKNO RADAR - GÜNLÜK İSTİHBARAT BÜLTENİ
Tarih: ${report.date || '22 Eylül 2026'}
Risk Skoru: ${report?.threatMeter?.overallScore || 8.8}/10 (${report?.threatMeter?.level || 'Yüksek'})

## 🚨 GÜNÜN FLAŞ TEHDİDİ
${report.morningBrief?.flashAlert?.title || ''}
${report.morningBrief?.flashAlert?.description || ''}

## 📋 YÖNETİCİ BRİFİNGİ
${report.executiveSummary || ''}

## 💡 AML EKİPLERİ İÇİN ZEKİCE FİKİRLER & REÇETELER
${(report.actionableIdeas || []).map((idea, i) => `
### #${i + 1} ${idea.title} [${idea.category}]
- Problem: ${idea.problem}
- Çözüm: ${idea.solution}
- Kural / Prompt:
${idea.promptOrLogic}
- Beklenen Etki: ${idea.expectedImpact}
`).join('\n')}
`;
    navigator.clipboard.writeText(mdText);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2500);
  };

  const filteredGlossary = useMemo(() => {
    if (!glossarySearch) return DEFAULT_AML_GLOSSARY;
    return DEFAULT_AML_GLOSSARY.filter(item => 
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(glossarySearch.toLowerCase())
    );
  }, [glossarySearch]);

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans antialiased flex flex-col selection:bg-[#b91c1c] selection:text-white">
      
      {/* 1. EXCEL KIRMIZI BAŞLIK ÇUBUĞU (Office Ribbon Bar - RED THEME) */}
      <header className="bg-[#b91c1c] text-white select-none shadow-sm">
        {/* Üst Logo, Dosya Adı ve Geçmiş Tarih Seçici */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* MASAÜSTÜ SOL: Logo ve yanında Tarih Dropdown */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 bg-white text-[#b91c1c] font-black rounded text-xs shadow-inner tracking-tighter">
                AML
              </div>
              <span className="font-bold text-base tracking-wide font-mono">amlteknoradar.com</span>
            </div>

            {/* Geçmiş Tarih / Arşiv Seçici Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#991b1b] border border-rose-400/40 px-2 py-1 rounded text-white shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-rose-200 flex-shrink-0" />
              <select
                value={selectedDateId}
                onChange={(e) => setSelectedDateId(e.target.value)}
                className="bg-transparent text-white font-mono text-[11px] sm:text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                title="Geçmiş günlerin sıralamasını ve raporunu görüntüle"
              >
                <option value="latest" className="bg-slate-800 text-white font-sans text-xs">
                  {report.date || "22 Eylül 2026 (En Güncel)"}
                </option>
                {archiveIndexData.map(d => (
                  <option key={d.isoDate} value={d.isoDate} className="bg-slate-800 text-white font-sans text-xs">
                    {d.date} • Risk: {d.threatScore}/10
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sağ Durum: Model / Telemetri Bilgisi */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs font-mono text-rose-100 flex-wrap">

            {/* 📱 MOBİL: "Sistem Bilgileri" Butonu */}
            <button
              type="button"
              onClick={() => setIsSystemInfoOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-[#7f1d1d] hover:bg-[#450a0a] active:scale-95 border border-rose-400/40 px-2.5 py-1.5 rounded text-xs font-mono font-bold text-white shadow-xs transition cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-rose-200 shrink-0" />
              <span>Sistem Bilgileri</span>
            </button>

            {/* ⚡ MASAÜSTÜ: LLM & Veri Telemetrisi */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Çalışma Süresi */}
              <div className="flex flex-col justify-between py-1 px-2.5 bg-[#991b1b] border border-rose-400/30 rounded text-[11px] font-mono shadow-xs h-[50px]">
                <div className="flex items-center gap-1 text-amber-300 font-semibold whitespace-nowrap leading-none pt-0.5">
                  <Clock className="w-3 h-3 text-amber-300 flex-shrink-0" />
                  <span>{report.durationSeconds || 69}s</span>
                </div>
                <div className="flex items-center gap-1 text-rose-200 font-medium whitespace-nowrap border-t border-rose-400/20 pt-1 leading-none text-[10.5px]">
                  <span>06:00 TSİ (Otomatik)</span>
                </div>
              </div>

              {/* LLM Modeli */}
              <div className="flex flex-col justify-between py-1 px-2.5 bg-[#991b1b] border border-rose-400/30 rounded text-[11px] font-mono shadow-xs h-[50px]">
                <div className="flex items-center gap-1 text-cyan-300 font-semibold whitespace-nowrap leading-none pt-0.5">
                  <Zap className="w-3 h-3 text-cyan-300 flex-shrink-0" />
                  <span>DeepSeek v3</span>
                </div>
                <div className="flex items-center gap-1 text-white font-bold whitespace-nowrap border-t border-rose-400/20 pt-1 leading-none text-[10.5px]">
                  <span>Reasoning Motoru</span>
                </div>
              </div>

              {/* Token Telemetrisi */}
              <div className="flex flex-col justify-center items-center bg-[#7f1d1d] border border-rose-400/40 px-2.5 py-1 rounded font-mono shadow-xs text-center h-[50px]">
                <span className="text-yellow-300 font-bold text-[9.5px] uppercase">Bileşik Toplam</span>
                <span className="text-xs font-black text-white">
                  {((report.tokenUsage?.totalTokens || 84200) / 1000).toFixed(1)}k token
                </span>
              </div>

              {/* Taranan Kaynaklar: Reddit & X */}
              <div className="flex flex-col justify-between py-1 px-2.5 bg-[#991b1b] border border-rose-400/30 rounded text-[11px] font-mono shadow-xs h-[50px]">
                <div className="grid grid-cols-[14px_44px_6px_auto] items-center gap-x-1 leading-none pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0"></span>
                  <span className="text-rose-100 font-semibold">Reddit</span>
                  <span className="text-rose-300 font-bold">:</span>
                  <strong className="text-white font-bold">{report.totalPostsAnalyzed || 45}</strong>
                </div>
                <div className="grid grid-cols-[14px_44px_6px_auto] items-center gap-x-1 border-t border-rose-400/20 pt-1 leading-none text-[10.5px]">
                  <span className="w-3 h-3 bg-black text-white text-[8px] font-black flex items-center justify-center rounded-xs shrink-0">𝕏</span>
                  <span className="text-rose-200 font-semibold">Twitter</span>
                  <span className="text-rose-300 font-bold">:</span>
                  <strong className="text-white font-bold">{report.totalTweetsAnalyzed || 50}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. ZAMAN SEÇİCİ SEKMELER & BÜLTEN BUTONU (KIRMIZI ŞERİT BUTONLAR) */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 border-t border-[#991b1b] pt-2 pb-1.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 w-full">
            {[
              { id: 'daily', label: '📊 24 Saatlik Sıralama' },
              { id: 'weekly', label: '📈 1 Haftalık Trend' },
              { id: 'monthly', label: '🪐 1 Aylık Makro' },
              { id: 'report', label: '📋 Danışman Bülteni' },
              { id: 'ideas', label: '💡 Zekice Fikirler' },
              { id: 'glossary', label: '📖 Günün Sözlüğü' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`h-9 flex items-center justify-center transition font-mono text-[11px] sm:text-xs font-bold rounded shadow-xs text-center cursor-pointer ${
                  timeframe === tab.id
                    ? 'bg-white text-[#b91c1c] shadow-xs'
                    : 'text-rose-100 bg-[#991b1b] hover:bg-[#7f1d1d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsNewsletterModalOpen(true)}
              className="h-9 flex items-center justify-center gap-1.5 transition font-mono text-[11px] sm:text-xs font-bold rounded shadow-xs text-center text-rose-100 bg-[#7f1d1d] hover:bg-[#450a0a] hover:text-white cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-rose-200" />
              <span>Bültene Abone Ol</span>
            </button>
          </div>
        </div>
      </header>

      {/* 📱 MOBİL SİSTEM BİLGİLERİ MODALI */}
      {isSystemInfoOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setIsSystemInfoOpen(false)}
        >
          <div 
            className="bg-white border border-slate-300 rounded-lg shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto font-mono text-xs flex flex-col text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#b91c1c] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-rose-200" />
                <h3 className="font-bold text-sm font-mono">AML Tekno Radar Telemetrisi</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSystemInfoOpen(false)}
                className="w-7 h-7 rounded hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-rose-50 border border-rose-200 rounded p-3 space-y-1">
                <span className="text-[11px] font-bold text-rose-950 block">Aktif Yapay Zeka Motoru:</span>
                <p className="text-slate-800">DeepSeek v3 (Akıl Yürütme &amp; Strateji)</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-1">
                <span className="text-[11px] font-bold text-slate-800 block">Taranan Veri Havuzu:</span>
                <p className="text-slate-700">50+ Seçkin AML Subreddit'i + 50 X Otoritesi + Açık arXiv API</p>
              </div>
            </div>
            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-end rounded-b-lg">
              <button
                type="button"
                onClick={() => setIsSystemInfoOpen(false)}
                className="px-4 py-1.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded font-bold text-xs transition cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📬 BÜLTEN ABONELİK MODALI */}
      {isNewsletterModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsNewsletterModalOpen(false)}
        >
          <div 
            className="bg-white border border-slate-300 rounded-lg shadow-2xl max-w-md w-full overflow-hidden text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#b91c1c] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-white text-[#b91c1c] font-black rounded text-[11px] shadow-xs">
                  AML
                </div>
                <h3 className="font-bold text-sm font-mono tracking-tight">Günlük AML &amp; RegTech Bülteni</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsNewsletterModalOpen(false)}
                className="text-rose-200 hover:text-white p-1 rounded hover:bg-[#991b1b] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 font-mono leading-relaxed">
                Her sabah saat 06:00'da son 24 saatin aklama vakaları, SAR/STR promptları ve RegTech analizleri mailinize gelsin.
              </p>

              {subscribeStatus === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded p-4 text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-emerald-950 text-xs font-mono">
                    {subscribeMessage}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                      E-Posta Adresiniz:
                    </label>
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="orhaner1907@gmail.com"
                      className="w-full bg-[#f8fafc] border border-slate-300 text-slate-900 placeholder-slate-400 px-3 py-2 rounded text-xs font-mono focus:outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    className="w-full bg-[#b91c1c] hover:bg-[#991b1b] active:scale-[0.98] text-white font-mono font-bold text-xs py-2.5 rounded shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{subscribeStatus === 'loading' ? 'Kaydediliyor...' : 'Abone Ol →'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. EXCEL FORMÜL VE AD ÇUBUĞU (Formula Bar - RED ACCENT) */}
      <div className="bg-white border-b border-[#d1d5db] py-1.5 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono">
          {/* Ad Kutusu (Hücre Koordinatı) */}
          <div className="w-14 sm:w-16 bg-[#f9fafb] border border-[#d1d5db] px-2 py-1 text-center font-bold text-slate-700 select-none">
            {expandedId ? `B${filteredTools.findIndex(t => t.id === expandedId) + 2}` : timeframe === 'glossary' ? 'G1' : timeframe === 'report' ? 'R1' : 'A1'}
          </div>

          {/* fx İkonu */}
          <div className="flex items-center justify-center font-bold italic text-slate-500 px-1 border-r border-[#e5e7eb] pr-2">
            fx
          </div>

          {/* Formül Satırı */}
          <div className="flex-1 flex items-center bg-white border border-[#d1d5db] px-3 py-1 text-slate-700 truncate">
            <span className="text-[#b91c1c] font-bold mr-1.5">
              {timeframe === 'glossary' ? '=GÜNÜN_SÖZLÜĞÜ(' : timeframe === 'ideas' ? '=ZEKİCE_FİKİRLER(' : '=AML.RİSK_DEĞERLENDİR('}
            </span>
            <span className="text-blue-600 font-semibold truncate">
              {timeframe === 'glossary' 
                ? `"AML_KAVRAMLAR_VE_TİPOLOJİ_SÖZLÜĞÜ"` 
                : selectedTool 
                  ? `"${selectedTool.name}", KATEGORİ="${selectedTool.category}", RİSK=${selectedTool.hypeScore}/10` 
                  : '"TÜM_AML_TİPOLOJİLERİ"'}
            </span>
            <span className="text-[#b91c1c] font-bold">)</span>
          </div>
        </div>
      </div>

      {/* 4. KATEGORİ VE ÇALIŞMA ALANI */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 w-full flex-1 space-y-4">
        
        {/* ☕ 30 SANİYELİK SABAH İSTİHBARATI (Sadece Günlük Görünümde) */}
        {timeframe === 'daily' && report.morningBrief && (
          <section className="bg-white border border-[#cbd5e1] rounded-sm p-3.5 sm:p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#b91c1c] text-white flex items-center justify-center font-bold shadow-2xs">
                  <Coffee className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 font-mono uppercase tracking-tight">
                    30 Saniyelik Sabah İstihbaratı: Finansal Suçlar Dünyasında Bugün
                  </h2>
                  <p className="text-[11px] text-slate-500 font-sans hidden sm:block">
                    Mali suçlar, yaptırımlar ve yapay zeka gündemini 30 saniyede yakalayın.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsBriefExpanded(!isBriefExpanded)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  {isBriefExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isBriefExpanded && (
              <div className="space-y-3 pt-0.5">
                {/* İkili Flaş & Savunma Kartı */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
                  {/* Sol Kart: 🔥 En Kritik Tehdit */}
                  <div className="bg-rose-50/80 border border-rose-300/90 rounded p-3 shadow-2xs flex flex-col justify-between gap-2.5 h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-nowrap pb-1.5 border-b border-rose-200/70 min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-sm shrink-0">🚨</span>
                          <span className="text-[11px] font-mono font-bold text-rose-950 uppercase tracking-tight shrink-0">
                            Günün Flaş Tehdidi:
                          </span>
                          <span className="font-mono text-xs sm:text-sm font-black text-rose-900 bg-rose-100 px-2 py-0.5 rounded border border-rose-300 truncate min-w-0">
                            FAST Smurfing &amp; Kripto Köprüler
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-600 text-white font-black shadow-2xs shrink-0 whitespace-nowrap">
                          RİSK: 9.8/10
                        </span>
                      </div>
                      <p className="text-xs text-rose-900 mt-2 leading-relaxed">
                        {report.morningBrief?.flashAlert?.description || 'DeFi köprülerinden kaçırılan fonlar anlık ödeme sistemlerinde küçük parçalar halinde aklanıyor.'}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-rose-800/80 pt-1.5 flex items-center justify-between border-t border-rose-200/50">
                      <span>Etki Alanı: Perakende Bankacılık &amp; VASP</span>
                      <span>Öncelik Seviyesi: Kritik</span>
                    </div>
                  </div>

                  {/* Sağ Kart: ⭐ En Etkili Savunma Reçetesi */}
                  <div className="bg-amber-50/80 border border-amber-300/90 rounded p-3 shadow-2xs flex flex-col justify-between gap-2.5 h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-nowrap pb-1.5 border-b border-amber-200/70 min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-sm shrink-0">⭐</span>
                          <span className="text-[11px] font-mono font-bold text-amber-950 uppercase tracking-tight shrink-0">
                            Öne Çıkan Savunma:
                          </span>
                          <span className="font-mono text-xs sm:text-sm font-black text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 truncate min-w-0">
                            DeepSeek SAR/STR Otomasyonu
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-600 text-white font-black shadow-2xs shrink-0 whitespace-nowrap">
                          VERİM: 9.6/10
                        </span>
                      </div>
                      <p className="text-xs text-amber-900 mt-2 leading-relaxed">
                        Analistlerin resmi şüpheli işlem gerekçesini yazarken harcadığı 45 dakikalık süreyi 12 dakikaya indirip MASAK ve FinCEN formatına tam uyum sağlıyor.
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-amber-800/80 pt-1.5 flex items-center justify-between border-t border-amber-200/50">
                      <span>Kullanım: Banka Uyum Birimleri</span>
                      <span>Zaman Tasarrufu: %65</span>
                    </div>
                  </div>
                </div>

                {/* 4 Kare Makro Kırılma */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 items-stretch subgrid-row-morning">
                  {[
                    { tag: "Yaptırımlar & OFAC", icon: "🏛️", text: "OFAC ve AB, transponder kapatan 18 paravan denizcilik şirketini kara listeye aldı. Dış ticaret bankacılığına otomatik IMO tarama uyarısı yapıldı." },
                    { tag: "Grafik AI & GNN", icon: "🕸️", text: "Heterojen Grafik Sinir Ağları (HGNN) banka transfer ağlarındaki smurfing döngülerini %94 doğrulukla izole ederek kural motorlarına fark attı." },
                    { tag: "Sentetik Kimlik", icon: "🎭", text: "Deepfake selfie ve sahte kimliklerle açılan kurye hesaplara karşı SIM kart değişiklik hızı (velocity) ve cihaz parmak izi zorunlu kılınıyor." },
                    { tag: "Kripto & Mixer", icon: "⛓️", text: "ZachXBT uyardı: Cüzdan zehirleme saldırılarıyla zincir içi analiz yazılımlarını yanıltmak için sıfıra yakın sub-cent test transferleri arttı." }
                  ].map((bullet, bIdx) => (
                    <div 
                      key={bIdx}
                      className="p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-sm hover:border-[#b91c1c] transition shadow-2xs flex flex-col justify-between h-full subgrid-card-morning group"
                    >
                      <div className="flex items-center gap-2 pb-2 border-b border-[#e2e8f0] w-full">
                        <span className="text-base shrink-0 select-none">{bullet.icon}</span>
                        <span className="font-mono text-[11px] font-bold text-slate-800 uppercase tracking-tight truncate">
                          {bullet.tag}
                        </span>
                      </div>
                      <div className="pt-2 flex-1 flex flex-col justify-start">
                        <p className="text-xs text-slate-700 leading-relaxed font-normal">
                          {bullet.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 📖 GÜNÜN SÖZLÜĞÜ (Doğrudan Odak / Sekme Görünümü) */}
        {timeframe === 'glossary' && (
          <section className="bg-white border border-[#cbd5e1] rounded-sm p-4 sm:p-5 shadow-xs space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-[#b91c1c]" />
                  <h2 className="font-bold text-xs sm:text-sm text-slate-900 font-mono uppercase tracking-wide">
                    AML &amp; FinCrime Kavramlar Sözlüğü ({report.date || "22 Eylül 2026"})
                  </h2>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-50 text-[#b91c1c] border border-rose-200 font-bold">
                  {filteredGlossary.length} Güncel Kavram
                </span>
              </div>

              {/* Arama Çubuğu */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="Kavram ara... (örn: Smurfing, Layering, GNN, Mule)"
                  className="w-full pl-9 pr-7 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-800 focus:outline-none focus:border-[#b91c1c] font-sans"
                />
                {glossarySearch && (
                  <button onClick={() => setGlossarySearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sade Sözlük Kartları */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredGlossary.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e2e8f0] rounded p-3.5 hover:border-slate-400 transition flex flex-col justify-between shadow-2xs"
                  >
                    <div className="pb-2 border-b border-slate-200">
                      <h4 className="font-mono font-bold text-xs sm:text-[13px] text-slate-900 tracking-tight leading-snug">
                        {item.term}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-normal pt-2">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 💡 ZEKİCE AML FİKİRLERİ SEKME GÖRÜNÜMÜ */}
        {timeframe === 'ideas' && (
          <section className="space-y-4">
            <div className="bg-white border border-[#cbd5e1] rounded-sm p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#b91c1c]" />
                  <h2 className="font-bold text-sm sm:text-base text-slate-900 font-mono uppercase">
                    AML Ekipleri İçin Zekice Fikirler &amp; Aksiyon Reçeteleri
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {(report.actionableIdeas || []).length} Hazır Reçete
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Analistlerin doğrudan kopyalayıp kullanabileceği hazır LLM promptları, anomali kuralları ve OSINT sorguları.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {(report.actionableIdeas || []).map((idea, idx) => (
                <div key={idea.id || idx} className="bg-white border border-[#cbd5e1] rounded-sm p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-xs text-[#b91c1c] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      #{idx + 1} {idea.category} • {idea.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      ⚡ {idea.expectedImpact}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{idea.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <strong className="text-rose-900 block mb-1 font-mono uppercase text-[10px]">⚠️ Acı Noktası:</strong>
                      <p className="text-slate-700 leading-relaxed">{idea.problem}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <strong className="text-emerald-900 block mb-1 font-mono uppercase text-[10px]">💡 Zekice Çözüm:</strong>
                      <p className="text-slate-700 leading-relaxed">{idea.solution}</p>
                    </div>
                  </div>
                  {idea.promptOrLogic && (
                    <div className="relative bg-slate-900 text-emerald-400 p-3 rounded font-mono text-xs overflow-x-auto">
                      <button
                        onClick={() => handleCopyCmd(idea.id, idea.promptOrLogic)}
                        className="absolute right-2 top-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] flex items-center gap-1 transition cursor-pointer"
                      >
                        {copiedCmdId === idea.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCmdId === idea.id ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
                      </button>
                      <pre className="whitespace-pre-wrap pr-16">{idea.promptOrLogic}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 📋 DANIŞMAN RAPORU (BÜLTEN) GÖRÜNÜMÜ */}
        {timeframe === 'report' && (
          <section className="bg-white border border-[#cbd5e1] rounded-sm p-4 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-wrap gap-2">
              <div>
                <h2 className="font-bold text-base text-slate-900 font-mono uppercase">
                  AML &amp; RegTech Danışman Bülteni ({report.date})
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Küresel Risk Skoru: {report.threatMeter?.overallScore || 8.8}/10 • {report.threatMeter?.level || 'Yüksek'}
                </p>
              </div>
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded font-mono text-xs font-bold transition cursor-pointer"
              >
                {copiedMd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMd ? 'Markdown Kopyalandı!' : 'Bülteni Markdown Kopyala'}</span>
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-normal">
              <div className="p-3.5 bg-rose-50 border-l-4 border-l-[#b91c1c] rounded-r">
                <span className="font-mono font-bold text-rose-950 uppercase block mb-1">
                  🚨 GÜNÜN FLAŞ UYARISI:
                </span>
                <p className="text-rose-900 font-semibold">{report.morningBrief?.flashAlert?.title}</p>
                <p className="text-rose-800 mt-1">{report.morningBrief?.flashAlert?.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold font-mono text-slate-900 uppercase text-xs">📋 Yönetici Brifingi:</h3>
                <p className="whitespace-pre-line text-slate-800 leading-relaxed">{report.executiveSummary}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h3 className="font-bold font-mono text-slate-900 uppercase text-xs">⚡ Yükselen Aklama Tipolojileri Tablosu:</h3>
                <table className="w-full border-collapse border border-slate-200 text-xs">
                  <thead className="bg-slate-100 font-mono text-slate-700">
                    <tr>
                      <th className="border border-slate-200 p-2 text-left">Tipoloji</th>
                      <th className="border border-slate-200 p-2 text-center">Risk Skoru</th>
                      <th className="border border-slate-200 p-2 text-center">Trend (Delta)</th>
                      <th className="border border-slate-200 p-2 text-left">Hedef Sektör</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(report.threatAndTypologyMatrix || []).map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border border-slate-200 p-2 font-semibold text-slate-900">{t.name}</td>
                        <td className="border border-slate-200 p-2 text-center font-mono font-bold text-rose-700">{t.riskScore}/10</td>
                        <td className="border border-slate-200 p-2 text-center font-mono text-emerald-700 font-bold">{t.delta}</td>
                        <td className="border border-slate-200 p-2 text-slate-600">{t.targetSector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Kategori Filtre Çubuğu (Tablo Görünümünde) */}
        {timeframe !== 'report' && timeframe !== 'glossary' && timeframe !== 'ideas' && (
          <div className="bg-white border border-[#d1d5db] p-2 rounded-sm shadow-xs flex flex-wrap items-center gap-1 sm:gap-1.5">
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 font-bold px-1 sm:px-2 whitespace-nowrap">
              <Filter className="w-3 h-3 text-[#b91c1c]" />
              <span>KATEGORİ:</span>
            </div>
            {CATEGORY_DEFINITIONS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap transition border rounded-xs cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#b91c1c] text-white border-[#b91c1c] font-bold shadow-xs'
                    : 'bg-[#f9fafb] text-slate-700 hover:bg-slate-100 border-[#e5e7eb]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* 5. MASAÜSTÜ EXCEL IZGARA TABLOSU (hidden md:block - RED THEME) */}
        {timeframe !== 'report' && timeframe !== 'glossary' && timeframe !== 'ideas' && (
          <div className="hidden md:block bg-white border border-[#d1d5db] shadow-xs overflow-hidden">
            <table className="w-full table-fixed text-left border-collapse font-sans text-xs">
              <colgroup>
                <col className="w-12" />
                <col className="w-56" />
                <col className="w-36" />
                <col />
                <col className="w-24" />
                <col className="w-28" />
                <col className="w-28" />
              </colgroup>
              
              {/* Sütun Harfleri ve Başlıklar (A - G) */}
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#d1d5db] text-[10px] font-mono text-slate-500 select-none">
                  <th className="w-12 text-center py-1 border-r border-[#e2e8f0]">A</th>
                  <th className="w-56 px-3 py-1 border-r border-[#e2e8f0] text-left">B</th>
                  <th className="w-36 px-3 py-1 border-r border-[#e2e8f0] text-left">C</th>
                  <th className="px-3 py-1 border-r border-[#e2e8f0] text-left">D</th>
                  <th className="w-24 px-3 py-1 border-r border-[#e2e8f0] text-right">E</th>
                  <th className="w-28 px-3 py-1 border-r border-[#e2e8f0] text-right">F</th>
                  <th className="w-28 px-3 py-1 text-center">G</th>
                </tr>

                <tr className="bg-[#f1f5f9] border-b-2 border-[#cbd5e1] text-[11px] font-semibold text-slate-700 select-none">
                  <th className="w-12 text-center py-2.5 border-r border-[#cbd5e1]">Sıra</th>
                  <th className="w-56 px-3 py-2.5 border-r border-[#cbd5e1] text-left">Tipoloji / Model Adı</th>
                  <th className="w-36 px-3 py-2.5 border-r border-[#cbd5e1] text-left">Kategori</th>
                  <th className="px-3 py-2.5 border-r border-[#cbd5e1] text-left">Temel Yetenek &amp; Fonksiyon</th>
                  <th className="w-24 px-3 py-2.5 border-r border-[#cbd5e1] text-right">Risk Skoru</th>
                  <th className="w-28 px-3 py-2.5 border-r border-[#cbd5e1] text-right">Trend / Delta</th>
                  <th className="w-28 px-3 py-2.5 text-center">Kaynaklar</th>
                </tr>
              </thead>

              {/* Tablo Satırları */}
              <tbody className="divide-y divide-[#e2e8f0]">
                {filteredTools.map((tool, idx) => {
                  const isExpanded = expandedId === tool.id;

                  return (
                    <React.Fragment key={tool.id}>
                      <tr 
                        onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                        className={`h-11 cursor-pointer transition-colors select-none ${
                          isExpanded 
                            ? 'bg-[#fee2e2] border-l-4 border-l-[#b91c1c]' 
                            : idx % 2 === 0 
                              ? 'bg-white hover:bg-[#fef2f2]' 
                              : 'bg-[#fafafa] hover:bg-[#fef2f2]'
                        }`}
                      >
                        {/* Kolon A: Sıra */}
                        <td className="w-12 text-center font-mono font-bold text-slate-600 border-r border-[#e2e8f0]">
                          #{idx + 1}
                        </td>

                        {/* Kolon B: Model Adı */}
                        <td className="w-56 px-3 border-r border-[#e2e8f0] truncate">
                          <span className="font-bold text-slate-900 hover:text-[#b91c1c] transition truncate">
                            {tool.name}
                          </span>
                        </td>

                        {/* Kolon C: Kategori */}
                        <td className="w-36 px-3 border-r border-[#e2e8f0] truncate">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {tool.category}
                          </span>
                        </td>

                        {/* Kolon D: Temel Fonksiyon */}
                        <td className="px-3 border-r border-[#e2e8f0] truncate text-slate-600 text-[11px]">
                          {tool.primaryFunction}
                        </td>

                        {/* Kolon E: Risk Skoru */}
                        <td className="w-24 px-3 border-r border-[#e2e8f0] text-right font-mono">
                          <span className="font-black text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            {tool.hypeScore}/10
                          </span>
                        </td>

                        {/* Kolon F: Trend */}
                        <td className="w-28 px-3 border-r border-[#e2e8f0] text-right font-mono">
                          <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-[11px]">
                            {tool.scoreDelta > 0 ? `+${tool.scoreDelta}` : tool.scoreDelta === 0 ? '0.0' : tool.scoreDelta}
                          </span>
                        </td>

                        {/* Kolon G: Kaynaklar */}
                        <td className="w-28 px-3 text-center truncate text-[10px] text-slate-500 font-mono">
                          {(tool.sources || []).join(', ')}
                        </td>
                      </tr>

                      {/* Genişletilmiş Satır Detayı */}
                      {isExpanded && (
                        <tr className="bg-[#fff1f2] border-b border-rose-200">
                          <td colSpan={7} className="p-4">
                            <div className="space-y-3 font-mono text-xs">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="p-3 bg-white rounded border border-rose-200">
                                  <span className="text-[10px] font-bold text-rose-950 uppercase block mb-1">
                                    📌 Neden Gündemde?
                                  </span>
                                  <p className="text-slate-800 text-[11px] leading-relaxed font-sans">
                                    {tool.whyTrending}
                                  </p>
                                </div>
                                <div className="p-3 bg-white rounded border border-rose-200">
                                  <span className="text-[10px] font-bold text-rose-950 uppercase block mb-1">
                                    ⚡ Yetenek &amp; Detay:
                                  </span>
                                  <p className="text-slate-800 text-[11px] leading-relaxed font-sans">
                                    {tool.primaryFunction}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. MOBİL KART LİSTESİ (md:hidden) */}
        {timeframe !== 'report' && timeframe !== 'glossary' && timeframe !== 'ideas' && (
          <div className="md:hidden space-y-2.5">
            {filteredTools.map((tool, idx) => (
              <div 
                key={tool.id} 
                onClick={() => setExpandedId(expandedId === tool.id ? null : tool.id)}
                className="bg-white border border-[#cbd5e1] rounded-sm p-3 shadow-2xs space-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#b91c1c] text-xs">#{idx + 1}</span>
                    <h3 className="font-bold text-slate-900 text-xs">{tool.name}</h3>
                  </div>
                  <span className="font-mono font-black text-rose-700 text-xs bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    {tool.hypeScore}/10
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {tool.primaryFunction}
                </p>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* 8. SADE EXCEL DURUM ÇUBUĞU (Bottom Status Bar - RED THEME) */}
      <footer className="bg-[#e5e7eb] border-t border-[#d1d5db] px-4 py-1.5 flex items-center justify-between text-xs font-mono text-slate-600 select-none flex-wrap gap-2">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="font-bold text-[#b91c1c]">HAZIR</span>
          <span>TOPLAM: {filteredTools.length} TİPOLOJİ / MODEL</span>
          <span className="hidden sm:inline">ORTALAMA RİSK: {avgHypeScore}</span>
          <span className="hidden md:inline text-slate-500">
            | MOTOR: <strong className="text-slate-800">DeepSeek v3</strong>
          </span>
          <span className="hidden md:inline text-slate-500">
            | SÜRE: <strong className="text-slate-800">{report.durationSeconds || 69}s</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          <span className="hidden sm:inline">50 TOPLULUK</span>
          <span>%100 ZOOM</span>
        </div>
      </footer>

    </div>
  );
}
