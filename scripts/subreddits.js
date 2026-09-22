/**
 * AML & FinCrime Odaklı Reddit Topluluk Havuzu
 * Reddit'in resmi multi-subreddit (r/sub1+sub2) özelliği sayesinde
 * tek bir istekte 6-8 topluluk aynı anda taranır. Sıfır ban riski ve limitsizdir.
 */

export const REDDIT_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 AMLTechRadar/1.0";

export const SUBREDDIT_BATCHES = [
  {
    name: "AML, Uyum & Kara Para ile Mücadele",
    slug: "AMLCompliance+anti_money_laundering+compliance+FinCrime",
    description: "İşlem izleme, SAR/STR bildirimleri, KYC/CDD süreçleri ve regülasyon denetimleri.",
    icon: "ShieldAlert"
  },
  {
    name: "FinTech, Dolandırıcılık (Fraud) & Ödeme Sistemleri",
    slug: "fraud+FinTech+banking+PaymentProcessing",
    description: "Sentetik kimlikler, chargeback, kart dolandırıcılığı ve fintech açıkları.",
    icon: "CreditCard"
  },
  {
    name: "Açık Kaynak İstihbarat (OSINT) & Varlık Takibi",
    slug: "OSINT+investigation+cybersecurity+forensics",
    description: "Paravan şirket haritalama, off-shore hesap tespiti ve dijital ayak izi analizi.",
    icon: "Search"
  },
  {
    name: "Kripto Varlık AML, Mixer & On-Chain Güvenlik",
    slug: "CryptoCurrency+Crypto_General+defi+CryptoScams",
    description: "Mixer istismarları, köprü hack'leri, borsa dondurma kararları ve on-chain takip.",
    icon: "Coins"
  },
  {
    name: "Yapay Zeka, Grafik Analitiği & Anomali Tespiti",
    slug: "MachineLearning+datascience+artificial+AI_Agents",
    description: "Finansal ağ analizi (GNN), grafik veritabanları ve anomali tespit modelleri.",
    icon: "Cpu"
  }
];
