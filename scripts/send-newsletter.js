import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Otomatik .env yükleyici
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ALICI_MAIL = process.env.ALICI_MAIL || "orhaner1907@gmail.com";
const SENDER_EMAIL_PREF = process.env.SENDER_EMAIL || "AML Tekno Radar <bulten@aitrendleri.com>";
const FALLBACK_SENDER = "AML Tekno Radar <onboarding@resend.dev>";

/**
 * AML Raporunu Kurumsal HTML E-Posta Şablonuna Dönüştürür
 */
function buildAmlNewsletterHtml(report) {
  const dateStr = report.date || new Date().toLocaleDateString('tr-TR');
  const flash = report.morningBrief?.flashAlert || {};
  const ideas = report.actionableIdeas || [];
  const macros = report.morningBrief?.macroDevelopments || [];
  const typologies = report.threatAndTypologyMatrix || [];

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AML Tekno Radar - Günlük İstihbarat Bülteni</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090d16; color: #e2e8f0; margin: 0; padding: 20px; line-height: 1.6; }
    .container { max-width: 650px; margin: 0 auto; background: #0f172a; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; }
    .header { background: linear-gradient(135deg, #022c22 0%, #0f172a 100%); padding: 32px 24px; border-bottom: 1px solid #065f46; }
    .badge { display: inline-block; padding: 4px 10px; background: #059669; color: #ffffff; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .title { margin: 12px 0 6px 0; font-size: 24px; font-weight: 800; color: #f8fafc; }
    .subtitle { margin: 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 24px; }
    .card { background: #1e293b; border-radius: 8px; padding: 18px; margin-bottom: 20px; border-left: 4px solid #10b981; }
    .card-title { font-size: 16px; font-weight: 700; color: #f1f5f9; margin: 0 0 8px 0; }
    .card-body { font-size: 13px; color: #cbd5e1; margin: 0; }
    .code-block { background: #020617; border: 1px solid #334155; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 12px; color: #34d399; overflow-x: auto; margin: 10px 0; white-space: pre-wrap; }
    .threat-tag { display: inline-block; padding: 2px 8px; background: #dc2626; color: #ffffff; font-size: 10px; font-weight: 700; border-radius: 4px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">🛡️ AML & RegTech İstihbaratı</span>
      <h1 class="title">AML Tekno Radar Bülteni</h1>
      <p class="subtitle">${dateStr} • Günlük Yönetici ve Uyum Özeti</p>
    </div>
    <div class="content">
      <!-- Flaş Uyarı -->
      ${flash.title ? `
      <div class="card" style="border-left-color: #ef4444; background: #1a1625;">
        <span class="threat-tag">FLAŞ TEHDİT</span>
        <h3 class="card-title" style="color: #fca5a5; margin-top: 8px;">${flash.title}</h3>
        <p class="card-body">${flash.description || ""}</p>
      </div>` : ""}

      <!-- Yönetici Özeti -->
      <h3 style="color: #38bdf8; font-size: 16px; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-top: 24px;">📋 Yönetici Brifingi</h3>
      <p style="font-size: 13px; color: #cbd5e1;">${(report.executiveSummary || "").replace(/\n/g, "<br><br>")}</p>

      <!-- Zekice Fikirler -->
      <h3 style="color: #10b981; font-size: 16px; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-top: 24px;">💡 AML Ekipleri İçin Zekice Fikirler & Reçeteler</h3>
      ${ideas.map((idea, i) => `
        <div class="card">
          <div style="font-size: 11px; color: #10b981; font-weight: 700;">#${i + 1} ${idea.category || "Aksiyon"} • ${idea.badge || "Öneri"}</div>
          <h4 class="card-title" style="margin-top: 4px;">${idea.title}</h4>
          <p class="card-body"><strong>Acı Noktası:</strong> ${idea.problem}</p>
          <p class="card-body" style="margin-top: 6px;"><strong>Çözüm:</strong> ${idea.solution}</p>
          ${idea.promptOrLogic ? `<div class="code-block">${idea.promptOrLogic}</div>` : ""}
          <p class="card-body" style="font-size: 11px; color: #94a3b8;"><strong>Etki:</strong> ${idea.expectedImpact}</p>
        </div>
      `).join("")}

      <!-- Tipoloji Tablosu -->
      <h3 style="color: #fbbf24; font-size: 16px; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-top: 24px;">⚡ Yükselen Aklama Tipolojileri</h3>
      <table style="width: 100%; font-size: 12px; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background: #1e293b; color: #94a3b8; text-align: left;">
            <th style="padding: 8px;">Tipoloji</th>
            <th style="padding: 8px;">Risk</th>
            <th style="padding: 8px;">Trend</th>
          </tr>
        </thead>
        <tbody>
          ${typologies.map(t => `
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 8px; color: #f1f5f9;"><strong>${t.name}</strong><br><span style="color: #64748b; font-size: 11px;">Hedef: ${t.targetSector}</span></td>
              <td style="padding: 8px; color: #ef4444; font-weight: 700;">${t.riskScore}/10</td>
              <td style="padding: 8px; color: #34d399;">${t.delta}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <div class="footer">
      Bu bülten Reddit, Twitter ve arXiv açık kaynak verileri ile DeepSeek AI tarafından derlenmiştir.<br>
      © ${new Date().getFullYear()} AML Tekno Radar • Tüm Hakları Saklıdır.
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  console.log("📬 AML Bülteni Hazırlanıyor...");

  const reportPath = path.join(__dirname, '../src/data/latest-aml-report.json');
  if (!fs.existsSync(reportPath)) {
    console.error("❌ latest-aml-report.json bulunamadı. Önce 'npm run crawl' çalıştırın.");
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const htmlContent = buildAmlNewsletterHtml(report);

  // Önizleme dosyasını kaydet
  const previewPath = path.join(__dirname, '../newsletter-preview.html');
  fs.writeFileSync(previewPath, htmlContent, 'utf8');
  console.log(`📄 Bülten HTML önizlemesi kaydedildi: ${previewPath}`);

  if (!RESEND_API_KEY) {
    console.log("⚠️ RESEND_API_KEY tanımlanmamış. Önizleme oluşturuldu ancak e-posta gönderilmedi.");
    return;
  }

  const sendEmailWithSender = async (sender) => {
    return await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: sender,
        to: [ALICI_MAIL],
        subject: `🛡️ AML Tekno Radar: ${report.date} Günlük İstihbarat & Fikirler`,
        html: htmlContent
      })
    });
  };

  try {
    console.log(`🚀 Resend üzerinden e-posta gönderiliyor: ${ALICI_MAIL} (Gönderen: ${SENDER_EMAIL_PREF})...`);
    let res = await sendEmailWithSender(SENDER_EMAIL_PREF);

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`⚠️ İlk gönderen ile hata (${SENDER_EMAIL_PREF}): ${errText}`);
      console.log(`🔄 Güvenli yedek gönderici deneniyor: ${FALLBACK_SENDER}...`);
      res = await sendEmailWithSender(FALLBACK_SENDER);
    }

    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Bülten başarıyla gönderildi! Email ID: ${data.id}`);
    } else {
      const err = await res.text();
      console.warn(`❌ Resend HTTP ${res.status}: ${err}`);
    }
  } catch (err) {
    console.error("❌ E-posta gönderim hatası:", err.message);
  }
}

main().catch(console.error);
