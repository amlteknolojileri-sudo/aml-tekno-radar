/**
 * X (Twitter) AML & RegTech İstihbarat Kaynakları & Apify Sorgu Yapılandırması
 */

export const TWITTER_TARGET_ACCOUNTS = [
  // 🏛️ Otoriteler, Regülatörler & Kurumlar
  "FATFNews", "FinCENfocus", "FinCENnews", "ACAMS_FinCrime", "WolfsbergGroup",
  
  // 🔍 On-Chain İstihbarat & Kripto AML Dedektifleri
  "zachxbt", "chainalysis", "elliptic", "trmlabs", "arkhamintel", "CertiKAlert", "PeckShieldAlert",
  
  // 💡 AML, Yaptırımlar & RegTech Düşünce Önderleri
  "graham_barrow", "rbreese", "RegTechAnalyst", "FinTechGlobal", "FinCrimeWeekly", "DarkMoneyFiles", "AMLRightSource"
];

export const TWITTER_SEARCH_BATCHES = [
  // 1. Grup: Resmi AML ve Yaptırım Otoriteleri
  '(from:FATFNews OR from:FinCENfocus OR from:FinCENnews OR from:ACAMS_FinCrime OR from:graham_barrow OR from:rbreese) -filter:nativeretweets',
  
  // 2. Grup: Kripto Varlık ve On-Chain AML Dedektifleri
  '(from:zachxbt OR from:chainalysis OR from:elliptic OR from:trmlabs OR from:arkhamintel OR from:CertiKAlert OR from:PeckShieldAlert) -filter:nativeretweets',
  
  // 3. Grup: AML + Yapay Zeka & RegTech Trendleri
  '("AML" OR "Anti-Money Laundering" OR "FinCrime" OR "Transaction Monitoring") ("AI" OR "LLM" OR "Graph" OR "Agent" OR "Detection" OR "Typology") -filter:nativeretweets min_faves:3',
  
  // 4. Grup: Yaptırımlar, Kara Para & Finansal İstihbarat
  '("Sanctions Evasion" OR "Shell Company" OR "Money Mule" OR "Smurfing" OR "SAR reporting" OR "MASAK") -filter:nativeretweets min_faves:2'
];

/**
 * Apify Actor ile Twitter Verilerini Çeker
 */
export async function fetchAmlTwitterPosts(apifyToken) {
  if (!apifyToken) {
    console.warn("⚠️ APIFY_TOKEN tanımlanmamış, Twitter adımı atlanıyor.");
    return [];
  }

  console.log("🐦 Apify üzerinden küresel AML otoriteleri ve on-chain dedektifleri taranıyor...");

  const payload = {
    searchTerms: TWITTER_SEARCH_BATCHES,
    queryType: "Latest",
    maxItems: 150
  };

  try {
    const res = await fetch(`https://api.apify.com/v2/acts/xquik~x-tweet-scraper/run-sync-get-dataset-items?token=${apifyToken}&timeout=180`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(200000)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`⚠️ Apify HTTP ${res.status} döndü: ${errText.slice(0, 150)}`);
      return [];
    }

    const items = await res.json();
    if (!Array.isArray(items)) return [];

    const cutoff = Date.now() - 36 * 60 * 60 * 1000; // Son 36 saat
    const meaningful = items.filter(t => {
      const text = (t.text || t.full_text || "").replace(/^@\w+\s+/g, "").trim();
      if (text.length < 25) return false;
      if (t.createdAt) {
        const time = new Date(t.createdAt).getTime();
        if (time < cutoff) return false;
      }
      return true;
    });

    // Etkileşime göre sırala (Like + Retweet)
    meaningful.sort((a, b) => ((b.likeCount || 0) + (b.retweetCount || 0) * 2) - ((a.likeCount || 0) + (a.retweetCount || 0) * 2));

    return meaningful.slice(0, 50).map(t => {
      const handle = t.author?.username || t.userName || "aml_analyst";
      const name = t.author?.name || t.name || handle;
      const avatar = t.author?.profilePicture || t.profilePicture || "";
      const text = (t.text || t.full_text || "").trim();
      return {
        id: String(t.id || Math.random().toString(36).slice(2)),
        authorName: name,
        authorHandle: handle,
        authorAvatar: avatar,
        text: text,
        likes: t.likeCount || 0,
        retweets: t.retweetCount || 0,
        tweetUrl: t.url || `https://x.com/${handle}/status/${t.id}`,
        createdAt: t.createdAt || new Date().toISOString()
      };
    });
  } catch (err) {
    console.error("❌ Twitter çekme hatası:", err.message);
    return [];
  }
}
