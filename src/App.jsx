import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import AmlRadarCards from './components/AmlRadarCards.jsx';
import ActionableIdeasSheet from './components/ActionableIdeasSheet.jsx';
import ArxivResearchSheet from './components/ArxivResearchSheet.jsx';
import CommunityPulseSheet from './components/CommunityPulseSheet.jsx';
import NewsletterPreview from './components/NewsletterPreview.jsx';
import ArchiveModal from './components/ArchiveModal.jsx';

// Başlangıç Verileri
import initialReport from './data/latest-aml-report.json';
import archiveIndexData from './data/archive-index.json';

export default function App() {
  const [currentReport, setCurrentReport] = useState(initialReport);
  const [activeTab, setActiveTab] = useState('radar');
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    showToast("📡 Reddit, Twitter ve arXiv son 24 saatlik verileri taranıyor...");
    
    // Simüle edilmiş canlı tarama veya API isteği
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("✅ Veriler ve AML zeka çıktıları başarıyla güncellendi!");
    }, 2000);
  };

  const handleSelectArchiveDate = (isoDate) => {
    showToast(`📅 ${isoDate} tarihli arşiv raporu yüklendi.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Toast Bildirimi */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl text-xs font-mono flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Üst Navigasyon & Durum Çubuğu */}
      <Navbar
        report={currentReport}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenArchive={() => setIsArchiveOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Ana İçerik Konteyneri */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        {activeTab === 'radar' && (
          <AmlRadarCards 
            report={currentReport} 
            onExploreIdeas={() => setActiveTab('ideas')} 
          />
        )}

        {activeTab === 'ideas' && (
          <ActionableIdeasSheet 
            ideas={currentReport?.actionableIdeas || []} 
          />
        )}

        {activeTab === 'arxiv' && (
          <ArxivResearchSheet 
            papers={currentReport?.arxivHighlights || []} 
          />
        )}

        {activeTab === 'community' && (
          <CommunityPulseSheet 
            typologies={currentReport?.threatAndTypologyMatrix || []}
            communityPulse={currentReport?.communityPulse || {}}
          />
        )}

        {activeTab === 'newsletter' && (
          <NewsletterPreview 
            report={currentReport} 
          />
        )}
      </main>

      {/* Arşiv Modalı */}
      <ArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        archiveList={archiveIndexData}
        onSelectDate={handleSelectArchiveDate}
      />

      {/* Alt Bilgi (Footer) */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 lg:px-8 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-400 font-bold">AML TEKNO RADAR</span>
            <span>•</span>
            <span>Finansal Suçlar & RegTech Zeka Terminali</span>
          </div>
          <div className="text-[11px] font-mono text-slate-600">
            Açık kaynak istihbaratı ve yapay zeka ile otomatik derlenmektedir.
          </div>
        </div>
      </footer>

    </div>
  );
}
