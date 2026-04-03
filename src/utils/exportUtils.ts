import { marked } from 'marked';
import { getTeacherProfile } from './profileUtils';

export const exportToWord = async (markdown: string, filename: string, title: string = 'Belge') => {
  // Markdown'ı HTML'e çevir
  const htmlContent = await marked.parse(markdown);
  
  const profile = getTeacherProfile();
  const districtText = profile?.district ? `${profile.district.toLocaleUpperCase('tr-TR')} KAYMAKAMLIĞI` : '.................................................. KAYMAKAMLIĞI';
  const schoolText = profile?.schoolName ? `${profile.schoolName.toLocaleUpperCase('tr-TR')}` : '.................................................. MÜDÜRLÜĞÜ';
  const yearText = profile?.academicYear ? `${profile.academicYear} EĞİTİM ÖĞRETİM YILI` : '2023-2024 EĞİTİM ÖĞRETİM YILI';
  const teacherName = profile?.fullName ? profile.fullName : '.........................';
  const branchText = profile?.branch ? `<p>${profile.branch} Öğretmeni</p>` : '';
  
  // MEB Şablonuna uygun resmi Word HTML yapısı
  const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>${title}</title>
    <style>
      body { 
        font-family: 'Times New Roman', Times, serif; 
        font-size: 12pt; 
        line-height: 1.5;
        color: #000000;
      }
      .meb-header {
        text-align: center;
        font-weight: bold;
        margin-bottom: 24pt;
        line-height: 1.2;
      }
      .meb-title {
        font-size: 14pt;
      }
      .meb-subtitle {
        font-size: 12pt;
        margin-top: 6pt;
      }
      h1 { 
        font-size: 16pt; 
        text-align: center; 
        font-weight: bold; 
        text-transform: uppercase;
        margin-bottom: 18pt;
      }
      h2 { 
        font-size: 14pt; 
        font-weight: bold; 
        margin-top: 18pt; 
        margin-bottom: 6pt;
        border-bottom: 1px solid #000;
        padding-bottom: 2pt;
      }
      h3 { 
        font-size: 12pt; 
        font-weight: bold; 
        margin-top: 12pt;
        margin-bottom: 6pt;
      }
      p { 
        margin-bottom: 10pt; 
        text-align: justify;
      }
      table { 
        width: 100%; 
        border-collapse: collapse; 
        margin-bottom: 12pt; 
      }
      th, td { 
        border: 1px solid black; 
        padding: 6pt; 
        text-align: left;
        vertical-align: top;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
      ul, ol {
        margin-bottom: 10pt;
        padding-left: 24pt;
      }
      li {
        margin-bottom: 4pt;
      }
      .signatures {
        width: 100%;
        margin-top: 50pt;
        display: table;
      }
      .signature-block {
        display: table-cell;
        width: 50%;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="meb-header">
      <div class="meb-title">T.C.</div>
      <div class="meb-title">${districtText}</div>
      <div class="meb-title">${schoolText}</div>
      <div class="meb-subtitle">${yearText}</div>
    </div>
    ${htmlContent}
    <div class="signatures">
      <div class="signature-block">
        <p><strong>Ders Öğretmeni</strong></p>
        <p><br><br></p>
        <p>${teacherName}</p>
        ${branchText}
      </div>
      <div class="signature-block">
        <p><strong>Okul Müdürü</strong></p>
        <p>......./......./202...</p>
        <p><br></p>
        <p>.........................</p>
      </div>
    </div>
  </body>
  </html>`;

  // Blob oluştur ve indir
  const blob = new Blob(['\ufeff', header], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
