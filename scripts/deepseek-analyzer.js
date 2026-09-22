/**
 * DeepSeek AI AML Analiz ve Strateji Çıkarım Motoru
 * Toplanan ham Reddit, Twitter ve arXiv verilerini harmanlayarak
 * AML birimleri, uyum görevlileri ve RegTech mühendisleri için zekice fikirler üretir.
 */

export async function analyzeAmlDataWithDeepSeek({ redditPosts, twitterPosts, arxivPapers, apiKey }) {
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY eksik!");
  }

  console.log("🧠 DeepSeek v3/R1 çağrılıyor: AML & RegTech verileri sentezleniyor...");

  const redditContext = (redditPosts || []).slice(0, 30).map((p, idx) => 
    `[Reddit-${idx + 1}] [r/${p.subreddit}] "${p.title}" (Skor: ${p.score || 0})\nİçerik: ${(p.selftext || p.content || "").slice(0, 300)}`
  ).join("\n\n");

  const twitterContext = (twitterPosts || []).slice(0, 25).map((t, idx) => 
    `[X-${idx + 1}] @${t.authorHandle} (${t.likes} beğeni, ${t.retweets} RT): "${t.text}"`
  ).join("\n\n");

  const arxivContext = (arxivPapers || []).slice(0, 10).map((a, idx) => 
    `[arXiv-${idx + 1}] [${a.id}] "${a.title}" - Yazarlar: ${a.authors.join(", ")}\nÖzet: ${a.summary.slice(0, 350)}\nLink: ${a.arxivUrl}`
  ).join("\n\n");

  const systemPrompt = `Sen küresel bir AML/CFT (Anti-Money Laundering & Combating the Financing of Terrorism), Finansal İstihbarat, Yaptırımlar (OFAC/AB), MASAK mevzuatı ve RegTech Yapay Zeka Baş Danışmanısın.

Görevin; son 24 saat içinde Reddit, X (Twitter) ve arXiv platformlarında konuşulan finansal suç, işlem izleme, kripto aklama ve anomali tespiti verilerini analiz edip; banka, fintek ve ödeme kuruluşlarının AML/Uyum birimlerinin doğrudan uygulayabileceği "Zekice Fikirler", "SAR/STR Otomasyon Şablonları" ve "Taktiksel İstihbarat" üretmektir.

Çıktıyı SADECE geçerli ve hatasız bir JSON objesi olarak ver. Markdown \`\`\`json bloğu KULLANMA veya sadece saf JSON döndür.`;

  const userPrompt = `Aşağıda son 24 saatte Reddit, Twitter ve arXiv'den toplanan gerçek veriler yer alıyor:

=== REDDIT TARTIŞMALARI ===
${redditContext || "Reddit verisi bulunamadı."}

=== X (TWITTER) İSTİHBARATI & REGÜLATÖR/DEDEKTİF PAYLAŞIMLARI ===
${twitterContext || "Twitter verisi bulunamadı."}

=== ARXIV AKADEMİK ARAŞTIRMALAR ===
${arxivContext || "arXiv verisi bulunamadı."}

---
LÜTFEN BU VERİLERİ DETAYLI ANALİZ ET VE AŞAĞIDAKİ JSON ŞEMASINA TAM UYGUN BİR ÇIKTI ÜRET:

{
  "date": "22 Eylül 2026",
  "isoDate": "2026-09-22",
  "threatMeter": {
    "overallScore": 8.5, // 1-10 arası
    "level": "Yüksek" | "Kritik" | "Orta",
    "activeAlertsCount": 12,
    "summary": "Tek cümlelik küresel tehdit durumu"
  },
  "morningBrief": {
    "flashAlert": {
      "title": "Günün En Kritik Tehdidi / Flaş Uyarısı",
      "tag": "On-Chain / Kripto" | "Yaptırım Kaçırma" | "Sentetik Kimlik" | "Mule Ağları",
      "description": "Detaylı açıklama ve etki analizi (3-4 cümle)"
    },
    "macroDevelopments": [
      {
        "category": "Regülasyon & Yaptırımlar",
        "title": "Başlık",
        "description": "Detaylı açıklama"
      },
      {
        "category": "Teknoloji & Anomali Tespiti",
        "title": "Başlık",
        "description": "Detaylı açıklama"
      },
      {
        "category": "Kripto Varlık & Mixer İstismarları",
        "title": "Başlık",
        "description": "Detaylı açıklama"
      }
    ]
  },
  "executiveSummary": "Günün 3-4 paragraflık derinlemesine AML & RegTech yönetici özeti. Güncel trendler, zayıf sinyaller, bankaların dikkat etmesi gereken noktalar.",
  "actionableIdeas": [
    // AML birimlerinin hemen uygulayabileceği EN AZ 4 ADET zekice fikir
    {
      "id": "idea-1",
      "title": "Fikir Başlığı (Örn: Banka SAR/STR Raporlamasında Çoklu Ajan Prompt Şablonu)",
      "category": "SAR/STR Otomasyonu" | "İşlem İzleme & Kural Mantığı" | "Mule (Kurye) Hesap Tespiti" | "OSINT & Paravan Şirket" | "Sentetik Kimlik Savunması",
      "badge": "Yüksek Verim" | "Hızlı Uygulanabilir" | "Maliyet Düşürücü" | "Kritik Güvenlik",
      "problem": "Mevcut operasyonel acı noktası (örneğin analistlerin vaka yazarken harcadığı 45 dakika)",
      "solution": "Zekice teknolojik çözüm",
      "promptOrLogic": "Doğrudan kopyalanıp LLM'e (DeepSeek/ChatGPT/Claude) verilebilecek test edilmiş prompt metni veya SQL/Python anomali kural mantığı",
      "expectedImpact": "Beklenen ölçülebilir fayda (örneğin %60 zaman tasarrufu, %40 false-positive düşüşü)"
    }
  ],
  "arxivHighlights": [
    // arXiv makalelerinden en çarpıcı 3 tanesi
    {
      "id": "arxiv-id",
      "title": "Makale Orijinal Başlığı",
      "authors": ["Yazar 1", "Yazar 2"],
      "executiveTakeaway": "Makalenin getirdiği yenilik (Türkçe 2 cümle)",
      "bankImplementationGuide": "Bunu bir banka veya fintek veri ekibi kendi sistemine nasıl entegre eder?",
      "arxivUrl": "https://arxiv.org/abs/...",
      "pdfUrl": "https://arxiv.org/pdf/..."
    }
  ],
  "threatAndTypologyMatrix": [
    // Son 24 saatte öne çıkan 5 aklama tipolojisi / tehdidi
    {
      "name": "Tipoloji Adı (Örn: Parçalanmış Anlık Fon Transferleri (FAST/FedNow Smurfing))",
      "riskScore": 8.9, // 1-10
      "trend": "rising" | "skyrocketing" | "stable" | "falling",
      "delta": "+1.2",
      "targetSector": "Banka & Dijital Cüzdanlar",
      "detectionTactic": "Bu tipolojiyi yakalamak için önerilen filtreleme kriteri"
    }
  ],
  "communityPulse": {
    "analystPainPoints": [
      "Analistlerin Reddit ve X'te en çok şikayet ettiği 3 konu (örn. alert fatigue, denetim belirsizliği)"
    ],
    "vendorRadar": [
      {
        "name": "Yazılım/Teknoloji (Örn: Chainalysis, ThetaRay, Actimize, LlamaIndex)",
        "sentiment": "Pozitif" | "Karışık" | "Eleştiriliyor",
        "topic": "Neden konuşulduğu"
      }
    ]
  }
}`;

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    }),
    signal: AbortSignal.timeout(180000)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API Hatası HTTP ${res.status}: ${err}`);
  }

  const data = await res.json();
  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) {
    throw new Error("DeepSeek boş yanıt döndürdü.");
  }

  try {
    const cleaned = rawContent.replace(/```json\s*/gi, "").replace(/```\s*$/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (parseErr) {
    console.error("❌ JSON Parse Hatası:", parseErr.message);
    throw new Error(`DeepSeek JSON geçerli değil: ${parseErr.message}`);
  }
}
