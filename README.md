# 🛡️ AML TEKNO RADAR (Finansal Suçlar & AI Zeka Terminali)

Finansal suçlarla mücadele (AML/CFT), yaptırımlar (Sanctions), işlem izleme (Transaction Monitoring), fraud ve RegTech alanlarını modern yapay zeka (LLM, GNN, Anomali Tespiti) ile birleştiren **günlük istihbarat, bülten ve karar destek platformu**.

Reddit, X (Twitter) ve arXiv gibi özel platformlardan son 24 saatin verilerini çeker, DeepSeek LLM ile işler ve **AML birimlerinin, MASAK/Uyum görevlilerinin, banka ve fintek analistlerinin doğrudan kullanabileceği zekice fikirler, SAR/STR prompt şablonları ve operasyonel reçeteler** üretir.

---

## 🌟 Öne Çıkan Özellikler

1. **Günün AML & FinCrime Radarı (Executive Morning Brief):**
   - Son 24 saat içinde patlayan küresel aklama vakaları, yeni kara/gri liste duyuruları, regülasyon uyarıları.
   - Küresel Tehdit Skoru (1-10) ve Etki Alanı Matrisi.

2. **AML Ekipleri İçin "Zekice Fikirler & Reçeteler" (Actionable Playbooks):**
   - **SAR / STR (Şüpheli İşlem Bildirimi) Otomasyonu:** Analistin vaka notlarını doğrudan resmi MASAK/FinCEN anlatısına dönüştüren test edilmiş kopyalanabilir prompt şablonları.
   - **Anlık Ödemelerde (FAST/FedNow) Para Katırı (Mule) Kuralı:** 3 dakika içinde parayı buharlaştıran kurye hesapları yakalayan dinamik anomali mantığı.
   - **Ticaret Sicil & Paravan Şirket Ağları OSINT Sorgusu:** Neo4j/Python graph analizi ile aynı adresteki sahte paravan şirketleri yakalama.
   - **Sentetik Kimlik Savunması:** Deepfake biyometrik atlatmaya karşı çok katmanlı doğrulama stratejisi.

3. **Akademik Ar-Ge & RegTech Masası (arXiv Decoded):**
   - arXiv'e yüklenen en son FinCrime, GNN (Grafik Sinir Ağları) ve Anomali Tespiti makalelerini bankacıların anlayacağı pratik "Bankada Nasıl Uygulanır?" rehberine dönüştürür.

4. **Saha & Topluluk Nabzı (Reddit & Twitter/X):**
   - ZachXBT ve on-chain dedektiflerinin son 24 saatteki cüzdan takip paylaşımları.
   - Uyum görevlilerinin alert fatigue (yanlış alarm yorgunluğu) şikayetleri ve çözüm yolları.
   - AML yazılımları (Chainalysis, Actimize, ThetaRay vb.) kullanıcı memnuniyet radarı.

5. **Kurumsal E-Posta Bülteni:**
   - Tek tıkla Substack / LinkedIn için Markdown kopyalama.
   - HTML e-posta şablonu indirme.
   - Resend API ile e-posta dağıtımı.

---

## 🔑 Kullanılan ve Gerekli API'ler

| API | Durum | Görev | Temin / Maliyet |
| :--- | :--- | :--- | :--- |
| **Apify API** | `.env` içinde tanımlı | X (Twitter) üzerindeki AML otoritelerini, dedektifleri ve anahtar kelimeleri tarar | `apify_api_...` anahtarınız hazır. Aylık 5$ ücretsiz kota yeterlidir. |
| **DeepSeek API** | `.env` içinde tanımlı | Toplanan ham veriyi analiz edip zekice fikirler, SAR promptları ve rapor üretir | `sk-fbbae...` anahtarınız hazır. `api.deepseek.com` |
| **arXiv API** | Hazır (Key gerekmez) | Finansal suç ve yapay zeka akademik makalelerini anlık çeker | **Tamamen ücretsiz & açık.** |
| **Reddit Akışları** | Hazır (Key gerekmez) | `r/AMLCompliance`, `r/fraud`, `r/anti_money_laundering` vb. tarar | **Tamamen ücretsiz & ban korumalı multi-RSS.** |
| **Resend API** | `.env` içinde tanımlı | Bülteni e-posta ile otomatik göndermek için | [resend.com](https://resend.com) üzerinden ücretsiz (Günde 100 mail). |

---

## 💻 Kullanım Komutları

### 1. Geliştirici Arayüzünü Başlatma (Local Preview)
```bash
npm run dev
```
Tarayıcınızda `http://localhost:3000` adresini açarak terminali anında kullanabilirsiniz.

### 2. Canlı Veri Taraması ve Zeka Analizi Çalıştırma (Crawl)
Reddit, Twitter (Apify) ve arXiv'den son 24 saatlik verileri çekip DeepSeek ile yeni bir günlük rapor üretmek için:
```bash
npm run crawl
```
*(Yeni rapor otomatik olarak `src/data/latest-aml-report.json` dosyasına ve arşiv dizinine kaydedilir).*

### 3. Bülteni E-Posta Olarak Gönderme & Önizleme
```bash
npm run newsletter
```
*(HTML önizlemesi `newsletter-preview.html` olarak kaydedilir ve tanımlı mail adresine gönderilir).*

### 4. Üretim Derlemesi (Build)
```bash
npm run build
```

---

## 🌐 Canlıya Alma (Cloudflare Pages / Vercel)
Projeyi Cloudflare Pages veya Vercel'e tek tıkla yükleyebilirsiniz:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework:** `Vite`
