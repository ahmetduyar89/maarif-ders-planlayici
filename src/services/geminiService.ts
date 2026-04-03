import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Kazanim {
  kazanim: string;
  soruSayisi: number;
}

export interface WrittenExamRequest {
  sinavBasligi: string;
  ders: string;
  sinifSeviyesi: string;
  ogretmenAdiSoyadi: string;
  kazanimlar: Kazanim[];
  ekKriterler?: string;
}

export interface RubricRequest {
  sinifSeviyesi: string;
  puanOlcegi: number;
  hedef: string;
  odevAciklamasi: string;
  ekKriterler?: string;
  standartlar?: string;
}

export interface GameIdeaRequest {
  sinifSeviyesi: string;
  ders: string;
  konu: string;
  mekan: string; // Sınıf İçi, Bahçe/Açık Alan, Fark Etmez
  materyalDurumu: string; // Materyalsiz, Basit Materyallerle, Fark Etmez
  ogrenciSayisi: string;
  ekTalimatlar?: string;
}

export const generateGameIdea = async (request: GameIdeaRequest): Promise<string> => {
  const prompt = `Sen yaratıcı bir eğitimci ve oyunlaştırma (gamification) uzmanısın. Öğretmenlerin ders konularını pekiştirmesi için eğlenceli, eğitici ve uygulanabilir oyun/etkinlik senaryoları tasarlıyorsun.

Aşağıdaki bilgilere göre, öğrencilerin konuyu yaşayarak ve eğlenerek öğrenmesini sağlayacak 2 farklı oyun/etkinlik fikri üret.

Ders: ${request.ders}
Sınıf Seviyesi: ${request.sinifSeviyesi}
Konu: ${request.konu}
Oyun Mekanı: ${request.mekan}
Materyal Durumu: ${request.materyalDurumu}
Tahmini Öğrenci Sayısı: ${request.ogrenciSayisi}
${request.ekTalimatlar ? `Ek Talimatlar: ${request.ekTalimatlar}` : ''}

Lütfen her bir oyun fikri için aşağıdaki yapıyı KESİNLİKLE kullan ve çıktıyı sadece Markdown formatında ver:

# Oyun 1: [Oyunun Yaratıcı ve İlgi Çekici Adı]
**Hedef:** [Bu oyunun konuyu nasıl pekiştirdiği 1-2 cümleyle]
**Mekan:** [Sınıf/Bahçe vb.] | **Süre:** [Tahmini süre] | **Materyaller:** [Gerekenler veya 'Materyalsiz']

### Hazırlık
[Öğretmenin oyun öncesi yapması gereken hazırlıklar, sınıf düzeni vb.]

### Nasıl Oynanır?
1. [Adım adım, net ve anlaşılır oyun kuralları]
2. [Öğrencilerin ne yapacağı]
3. [Puanlama veya kazanma koşulu (varsa)]

### Öğretmene İpuçları
[Oyunu daha akıcı hale getirmek, güvenliği sağlamak veya konuyu daha iyi vurgulamak için pedagojik tavsiyeler]

---

# Oyun 2: [Oyunun Yaratıcı ve İlgi Çekici Adı]
[Aynı yapıyı ikinci oyun için tekrarla]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface ProjectTaskRequest {
  sinifSeviyesi: string;
  ders: string;
  konu: string;
  odevTuru: string; // Proje Ödevi, Performans Ödevi, Araştırma Ödevi vb.
  sure: string;
  ogrenciCalismaSekli: string; // Bireysel, Grup Çalışması
  ekTalimatlar?: string;
}

export const generateProjectTask = async (request: ProjectTaskRequest): Promise<string> => {
  const prompt = `Sen uzman bir eğitimci ve müfredat tasarımcısısın. Öğrencilerin araştırma, problem çözme ve sunum becerilerini geliştirecek, yönergeleri çok net olan bir "${request.odevTuru}" taslağı hazırla.

Ders: ${request.ders}
Sınıf Seviyesi: ${request.sinifSeviyesi}
Konu: ${request.konu}
Ödev Türü: ${request.odevTuru}
Verilen Süre: ${request.sure}
Çalışma Şekli: ${request.ogrenciCalismaSekli}
${request.ekTalimatlar ? `Ek Talimatlar: ${request.ekTalimatlar}` : ''}

Lütfen çıktıyı aşağıdaki başlıkları KESİNLİKLE içerecek şekilde Markdown formatında hazırla:

# [Ödevin Yaratıcı ve İlgi Çekici Adı]
**Ders:** ${request.ders} | **Sınıf:** ${request.sinifSeviyesi} | **Süre:** ${request.sure} | **Çalışma Şekli:** ${request.ogrenciCalismaSekli}

## Ödevin Amacı ve Kazanımlar
[Öğrencilerin bu ödevle hangi akademik ve 21. yüzyıl becerilerini (araştırma, sunum, işbirliği vb.) kazanacağı]

## Görev Tanımı (Senaryo)
[Öğrenciye verilen görevin gerçek hayatla ilişkilendirilmiş, ilgi çekici senaryosu]

## Adım Adım Yönergeler
[Öğrencinin ödevi yaparken izlemesi gereken adımlar. 1., 2., 3. şeklinde çok net ve anlaşılır olmalı]

## Beklenen Çıktı ve Sunum
[Öğrenciden tam olarak ne teslim etmesi bekleniyor? (Rapor, poster, video, maket vb.) ve bunu nasıl sunacak?]

## Değerlendirme Kriterleri (Mini Rubrik)
[Ödevin hangi kriterlere göre değerlendirileceğini gösteren basit bir tablo veya liste. Örn: İçerik (%40), Görsellik (%20), Sunum (%20), Zamanında Teslim (%20)]

## Öğretmen Notu / İpuçları
[Öğrencilere rehberlik ederken dikkat edilecekler veya kaynak önerileri]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface StorytellingRequest {
  sinifSeviyesi: string;
  ders: string;
  konu: string;
  hikayeTuru: string;
  karakterler?: string;
  ekTalimatlar?: string;
}

export const generateStory = async (request: StorytellingRequest): Promise<string> => {
  const prompt = `Sen yaratıcı bir çocuk/gençlik kitabı yazarı ve uzman bir eğitimcisin. Sıkıcı, soyut veya anlaşılması zor olan eğitim konularını öğrencilerin ilgisini çekecek, akılda kalıcı kısa hikayelere veya senaryolara dönüştürüyorsun.

Aşağıdaki bilgilere göre, konuyu anlatan eğlenceli ve eğitici bir hikaye oluştur:

Ders: ${request.ders}
Sınıf Seviyesi: ${request.sinifSeviyesi}
Konu (Soyut Kavram/Olay): ${request.konu}
Hikaye Türü/Teması: ${request.hikayeTuru}
${request.karakterler ? `Ana Karakterler: ${request.karakterler}` : ''}
${request.ekTalimatlar ? `Ek Talimatlar: ${request.ekTalimatlar}` : ''}

Lütfen çıktıyı aşağıdaki başlıkları KESİNLİKLE içerecek şekilde Markdown formatında hazırla:

# [Hikayenin Yaratıcı ve İlgi Çekici Adı]
**Ders:** ${request.ders} | **Konu:** ${request.konu} | **Tür:** ${request.hikayeTuru}

## Hikaye
[Konuyu akıcı, heyecanlı ve yaş grubuna uygun bir dille anlatan hikaye metni. Soyut kavramları somutlaştır, metaforlar kullan. Paragraflara bölerek okunabilirliği artır.]

## Kıssadan Hisse (Öğrenilen Bilgi)
[Hikayenin içine gizlenmiş olan akademik bilginin, formülün veya tarihi olayın net, kısa ve anlaşılır bir özeti.]

## Sınıf İçi Tartışma Soruları
[Öğretmenin hikayeyi okuduktan sonra sınıfa sorabileceği, konuyu pekiştiren 3 adet açık uçlu soru.]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface ParentMeetingRequest {
  gorusmeTuru: string;
  sinifSeviyesi: string;
  ogrenciAdSoyad?: string;
  gundemMaddeleri: string;
  gucluYonler?: string;
  gelisimAlanlari?: string;
  ekTalimatlar?: string;
}

export const generateParentMeeting = async (request: ParentMeetingRequest): Promise<string> => {
  const prompt = `Sen deneyimli, empatik ve profesyonel bir okul yöneticisi ve rehber öğretmensin. Velilerle etkili iletişim kurmak, yapıcı geri bildirimler vermek ve toplantıları verimli yönetmek konusunda uzmansın.

Aşağıdaki bilgilere göre bir "${request.gorusmeTuru}" raporu/şablonu hazırla:

Görüşme Türü: ${request.gorusmeTuru}
Sınıf Seviyesi: ${request.sinifSeviyesi}
${request.ogrenciAdSoyad ? `Öğrenci Adı Soyadı: ${request.ogrenciAdSoyad}` : ''}
Gündem Maddeleri / Konuşulacaklar: ${request.gundemMaddeleri}
${request.gucluYonler ? `Öğrencinin Güçlü Yönleri: ${request.gucluYonler}` : ''}
${request.gelisimAlanlari ? `Gelişim Alanları: ${request.gelisimAlanlari}` : ''}
${request.ekTalimatlar ? `Ek Notlar: ${request.ekTalimatlar}` : ''}

Lütfen çıktıyı Markdown formatında hazırla.

Eğer bu bir "Genel Veli Toplantısı" ise şu başlıkları KESİNLİKLE İÇERSİN:
# [Sınıf Seviyesi] Veli Toplantısı Gündemi
## Toplantı Bilgileri (Tarih, Saat, Yer için boşluklar)
## Açılış ve Karşılama Konuşması (Kısa ve motive edici)
## Gündem Maddeleri (Detaylandırılmış)
## Velilerden Beklentiler ve İşbirliği
## Kapanış ve Soru-Cevap

Eğer bu bir "Bireysel Veli Görüşmesi" ise şu başlıkları KESİNLİKLE İÇERSİN (Sandviç metodunu kullanarak yapıcı bir dil kullan):
# Bireysel Veli Görüşme Raporu: ${request.ogrenciAdSoyad || '[Öğrenci Adı]'}
## Görüşme Özeti
## Öğrencinin Güçlü Yönleri ve Başarıları (Olumlu başlangıç)
## Gelişim Alanları ve Gözlemler (Yapıcı ve objektif geri bildirim)
## Evde Destek İçin Veliye Öneriler (Somut ve uygulanabilir tavsiyeler)
## Sonuç ve Takip Planı (Bir sonraki adım)`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface DifferentiatedInstructionRequest {
  sinifSeviyesi: string;
  ders: string;
  konu: string;
  kazanimlar: string;
  ekTalimatlar?: string;
}

export const generateDifferentiatedInstruction = async (request: DifferentiatedInstructionRequest): Promise<string> => {
  const prompt = `Sen uzman bir eğitim programcısı ve kapsayıcı eğitim (inclusive education) uzmanısın. Sınıf içindeki farklı öğrenme hızlarına ve ihtiyaçlarına sahip öğrenciler için "Farklılaştırılmış Öğretim" (Differentiated Instruction) etkinlikleri tasarlıyorsun.

Aşağıdaki bilgilere göre, aynı konuyu 3 farklı zorluk seviyesinde (Destek Bekleyen, Orta Düzey, İleri Düzey) işleyen etkinlikler üret:

Ders: ${request.ders}
Sınıf Seviyesi: ${request.sinifSeviyesi}
Konu: ${request.konu}
Kazanımlar: ${request.kazanimlar}
${request.ekTalimatlar ? `Ek Talimatlar: ${request.ekTalimatlar}` : ''}

Lütfen çıktıyı Markdown formatında ve aşağıdaki yapıda KESİNLİKLE hazırla:

# Farklılaştırılmış Öğretim Etkinlik Planı
**Ders:** ${request.ders} | **Sınıf:** ${request.sinifSeviyesi} | **Konu:** ${request.konu}

## Genel Bakış ve Derse Giriş
[Tüm sınıfın birlikte katılacağı, konuya ilgi uyandıran ortak bir giriş etkinliği (5-10 dk)]

## 1. Seviye: Destek Bekleyen Öğrenciler (Temel Düzey)
[Bu gruptaki öğrenciler konunun temel kavramlarını kavramaya ihtiyaç duyar. Daha çok somut materyaller, görsel destekler, adım adım yönergeler ve doğrudan öğretmen desteği içeren bir etkinlik tasarla.]
* **Etkinlik Adı:** [Ad]
* **Süre:** [Süre]
* **Nasıl Yapılacak:** [Adım adım açıklama]
* **Kullanılacak Materyaller/Destekler:** [Neler kullanılacak]

## 2. Seviye: Orta Düzey Öğrenciler (Beklenen Düzey)
[Bu gruptaki öğrenciler konuyu müfredatın beklediği standart düzeyde öğrenebilirler. Kendi başlarına veya küçük gruplar halinde çalışabilecekleri, temel kavramları uygulayacakları bir etkinlik tasarla.]
* **Etkinlik Adı:** [Ad]
* **Süre:** [Süre]
* **Nasıl Yapılacak:** [Adım adım açıklama]
* **Öğrenci Görevi:** [Öğrenciden beklenen çıktı]

## 3. Seviye: İleri Düzey Öğrenciler (Zenginleştirilmiş Düzey)
[Bu gruptaki öğrenciler konuyu hızlı kavrar ve daha karmaşık, derinlemesine düşünme gerektiren görevlere ihtiyaç duyar. Analiz, sentez, yaratıcılık veya problem çözme odaklı, bağımsız çalışabilecekleri bir etkinlik tasarla.]
* **Etkinlik Adı:** [Ad]
* **Süre:** [Süre]
* **Nasıl Yapılacak:** [Adım adım açıklama]
* **Meydan Okuma (Challenge):** [Öğrencileri zorlayacak ekstra görev]

## Ortak Kapanış ve Değerlendirme
[Farklı etkinlikleri yapan öğrencilerin bir araya gelip öğrendiklerini paylaşacakları ve öğretmenin genel bir değerlendirme yapacağı kapanış bölümü]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface WorksheetRequest {
  sinifSeviyesi: string;
  ders: string;
  konu: string;
  soruTipleri: string[];
  zorlukSeviyesi: string;
  ekTalimatlar?: string;
}

export const generateWorksheet = async (request: WorksheetRequest): Promise<string> => {
  const prompt = `Sen uzman bir eğitim materyali tasarımcısı ve öğretmensin. Aşağıdaki bilgilere göre, öğrencilerin konuyu pekiştirmesi için kapsamlı, pedagojik olarak uygun ve yazdırılabilir bir "Çalışma Yaprağı (Worksheet)" hazırla.

Ders: ${request.ders}
Sınıf Seviyesi: ${request.sinifSeviyesi}
Konu: ${request.konu}
İstenen Soru Tipleri: ${request.soruTipleri.join(', ')}
Zorluk Seviyesi: ${request.zorlukSeviyesi}
${request.ekTalimatlar ? `Ek Talimatlar: ${request.ekTalimatlar}` : ''}

Lütfen çalışma yaprağını şu kurallara göre hazırla:
1. En üste öğrencinin Adı, Soyadı, Sınıfı, Numarası ve Tarih yazabileceği bir başlık alanı ekle.
2. Çalışma yaprağının ana başlığını konuya uygun ve ilgi çekici bir şekilde belirle.
3. İstenen her soru tipi için ayrı bir bölüm oluştur ve her bölümün başına net yönergeler yaz (Örn: "Aşağıdaki boşlukları uygun kelimelerle doldurunuz.").
4. Soruları kolaydan zora doğru sırala.
5. **ÖNEMLİ:** Soruların daha belirgin olması için soru numaralarını ve köklerini kalın (bold) yaz (Örn: **1. Aşağıdakilerden hangisi...**).
6. Öğrencilerin cevaplarını yazabilmesi için yeterli boşluklar bırak (Markdown'da alt çizgiler veya boş satırlar kullanabilirsin).
7. En sona, öğretmenin kullanabilmesi için ayrı bir "Cevap Anahtarı" bölümü ekle. Cevap anahtarı bölümünü açıkça belirt ve öğrenciye verilecek çıktıya dahil edilmemesi gerektiğini not düş.
8. Çıktıyı sadece Markdown formatında ver.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface BEPRequest {
  ogrenciYasi: string;
  yetersizlikTuru: string;
  ders: string;
  mevcutDurum: string;
  hedefler: string;
  ekTalimatlar?: string;
}

export const generateBEP = async (request: BEPRequest): Promise<string> => {
  const prompt = `Sen uzman bir özel eğitim öğretmeni ve BEP (Bireyselleştirilmiş Eğitim Programı) geliştirme uzmanısın.
Aşağıdaki bilgilere sahip kaynaştırma/özel gereksinimli bir öğrenci için MEB standartlarına uygun bir BEP taslağı hazırla.

Öğrenci Yaşı/Sınıfı: ${request.ogrenciYasi}
Yetersizlik Türü / Özel Gereksinimi: ${request.yetersizlikTuru}
Ders: ${request.ders}
Öğrencinin Mevcut Performans Düzeyi: ${request.mevcutDurum}
Genel Hedefler: ${request.hedefler}
${request.ekTalimatlar ? `Ek Talimatlar: ${request.ekTalimatlar}` : ''}

Lütfen şu başlıkları içeren detaylı, uygulanabilir ve pedagojik olarak uygun bir BEP planı (Markdown formatında) oluştur:
# Bireyselleştirilmiş Eğitim Programı (BEP) Taslağı
**Ders:** ${request.ders} | **Sınıf:** ${request.ogrenciYasi} | **Yetersizlik Türü:** ${request.yetersizlikTuru}

## 1. Öğrencinin Mevcut Performans Düzeyi
[Öğrencinin yapabildikleri ve desteklenmesi gereken alanların özeti]

## 2. Uzun Dönemli Amaçlar (Yıllık)
[Öğrencinin bir eğitim yılı sonunda ulaşması beklenen hedefler]

## 3. Kısa Dönemli Hedefler (Aylık/Dönemlik)
[Uzun dönemli amaçlara ulaşmak için belirlenen alt hedefler]

## 4. Öğretimsel Uyarlamalar
* **Sınıf İçi Düzenlemeler:** [Fiziksel ortam, oturma düzeni vb.]
* **Yöntem ve Teknik Uyarlamaları:** [Kullanılacak özel öğretim yöntemleri]
* **Materyal Uyarlamaları:** [Görsel, işitsel veya dokunsal materyal destekleri]

## 5. Ölçme ve Değerlendirme Uyarlamaları
[Sınavlarda ve değerlendirmelerde yapılacak süre, format veya yöntem uyarlamaları]

## 6. Örnek Etkinlik Önerisi
[Bu öğrencinin hedeflerine ulaşmasını destekleyecek 1 adet somut etkinlik önerisi]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface EventPlanRequest {
  etkinlikAdi: string;
  okulKademesi: string;
  katilimciSayisi: string;
  mekan: string;
  ekIstekler?: string;
}

export const generateEventPlan = async (request: EventPlanRequest): Promise<string> => {
  const prompt = `Sen deneyimli bir okul yöneticisi ve sosyal etkinlikler koordinatörüsün. Okullarda kutlanan Belirli Gün ve Haftalar, milli bayramlar veya öğrenci kulübü etkinlikleri için yaratıcı, MEB mevzuatına uygun ve öğrencilerin aktif katılımını sağlayan etkinlik planları hazırlıyorsun.

Aşağıdaki bilgilere göre bir etkinlik/kutlama programı taslağı hazırla:

Etkinlik/Gün Adı: ${request.etkinlikAdi}
Okul Kademesi: ${request.okulKademesi}
Tahmini Katılımcı Sayısı: ${request.katilimciSayisi}
Etkinlik Mekanı: ${request.mekan}
${request.ekIstekler ? `Ek İstekler/Detaylar: ${request.ekIstekler}` : ''}

Lütfen çıktıyı aşağıdaki başlıkları içerecek şekilde Markdown formatında hazırla:

# ${request.etkinlikAdi} Etkinlik Planı
**Kademe:** ${request.okulKademesi} | **Mekan:** ${request.mekan} | **Katılımcı:** ${request.katilimciSayisi}

## 1. Etkinliğin Amacı ve Kazanımları
[Bu etkinliğin öğrencilere katacağı milli, manevi veya sosyal değerler]

## 2. Hazırlık Komitesi ve Görev Dağılımı
[Öğretmen ve öğrencilerden oluşan komitenin kimlerden oluşacağı ve görevleri]

## 3. Kutlama/Etkinlik Programı Akışı
[Saat saat veya madde madde tören/etkinlik akışı. Örn: Saygı duruşu, günün anlam ve önemini belirten konuşma, şiirler, gösteriler vb.]

## 4. Örnek Konuşma Metni (Günün Anlam ve Önemi)
[Törende bir öğretmenin veya öğrencinin okuyabileceği, coşkulu ve anlamlı 2-3 paragraflık örnek konuşma metni]

## 5. Pano ve Süsleme Fikirleri
[Okul koridorları veya sınıf panoları için yaratıcı, öğrenci katılımlı görsel tasarım fikirleri]

## 6. Sınıf İçi Tamamlayıcı Etkinlik Önerisi
[Tören dışında, öğretmenlerin kendi derslerinde bu günü anmak için yapabilecekleri 10-15 dakikalık kısa bir etkinlik]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface MultipleChoiceTestRequest {
  sinifSeviyesi: string;
  soruSayisi: number;
  konuAciklama: string;
  standartlar?: string;
}

export interface LessonPlanRequest {
  ders: string;
  sinif: string;
  konu: string;
  sure: string;
  sinifSeviyesi?: string;
  dersTipi?: string;
  ogrenmeHedefi?: string;
}

export interface LessonPlanResponse {
  dersBilgileri: {
    ders: string;
    sinif: string;
    sure: string;
    temaUnite: string;
  };
  kazanimlar: string[];
  beceriler: string[];
  degerler: string[];
  surecTasarimi: {
    giris: {
      hook: string;
      gunlukHayat: string;
    };
    gelisme: {
      etkinlik1: string;
      etkinlik2: string;
      etkinlik3: string;
    };
    sonuc: {
      yansitmaSorusu: string;
      transferGorevi: string;
    };
  };
  olcmeDegerlendirme: {
    gozlemFormu: string;
    cikisBileti: string;
    miniRubrik: string;
  };
}

export interface FiveEPlanRequest {
  sinifSeviyesi: string;
  konuKazanim: string;
  ekKriterler?: string;
  standartlar?: string;
}

export async function generateFiveEPlan(request: FiveEPlanRequest): Promise<string> {
  const prompt = `Sen uzman bir fen bilimleri eğitimcisi ve müfredat tasarımcısısın. Görevin, öğretmenin girdiği sınıf seviyesi, konu, ek kriterler ve müfredat standartları doğrultusunda yapılandırmacı yaklaşıma dayalı detaylı bir "5E Öğrenme Modeli Ders Planı" oluşturmaktır.

Aşağıdaki kurallara ve yapıya KESİNLİKLE uymalısın. Çıktıyı Türkçe olarak, akademik ama öğretmenin sınıfta kolayca uygulayabileceği pratik bir dille yazmalısın.

ÇIKTI ŞABLONU:
# [Konu Başlığı]: [Sınıf Seviyesi] için [Ana Konu] (5E Modeli)

## Engage (İlgi Uyandırma)
* **Aktivite:** Öğrencilerin dikkatini çekecek kısa bir görsel, video veya hikaye önerisi (Süre ve nasıl sunulacağı dahil).
* **Discrepant event (şaşırtıcı soru):** Öğrencilerin ön bilgilerini sarsacak ve merak uyandıracak kritik bir soru. Kısa bir sınıf tartışması formatı.

## Explore (Keşfetme / Soruşturma)
* **Grup çalışması:** Öğrencilerin aktif olarak katılacağı, materyal kullanacağı veya veri toplayacağı uygulamalı bir etkinlik. Grup mevcudunu ve görevleri netleştir.
* **Veri toplama:** Öğrencilerin neleri gözlemleyeceği ve nasıl kaydedeceği. Öğretmenin bu sıradaki rehber rolü.
* **Süre:** [Tahmini süre]

## Explain (Açıklama / Kavramsallaştırma)
* **Sınıf tartışması:** Explore aşamasındaki bulguların nasıl toparlanacağı.
* **Anahtar kavramlar ve terimler:** Öğretmenin açıklaması gereken bilimsel gerçekler ve model/diyagram kullanımı.
* **Kısa yazılı açıklama görevi:** Öğrencilerin kendi cümleleriyle kavramı tanımlamaları için kısa bir aktivite.

## Elaborate (Genişletme / Uygulama)
* **Uygulama senaryosu:** Öğrenilen bilginin yeni ve gerçek dünya ile ilişkili bir senaryoya veya probleme (STEM bağlantısı) aktarılması. Proje veya poster önerisi.
* **Gelişmiş soru:** Tartışmayı derinleştirecek üst düzey bir soru.

## Evaluate (Değerlendirme)
* **Formatif değerlendirmeler:** Süreç içi kontrol soruları ve gözlem taktikleri.
* **Summative (özet) değerlendirme önerisi:** Kısa sınav (çoktan seçmeli, açık uçlu, grafik yorumlama vb. dağılımlarıyla).
* **Öğrenci öz-değerlendirmesi:** Öğrencinin kendi öğrenmesini yansıtacağı bir yöntem (örn. çıkış bileti).

## Sınıftaki Uyarlamalar / Destekler
* **Daha fazla destek gereken öğrenciler için:** Somutlaştırma ve basitleştirme adımları.
* **İleri düzey öğrenciler için:** Konuyu zenginleştirecek ekstra analiz veya araştırma görevleri.

## Malzemeler
* [Madde işaretli tam liste]

## Ders Süresi Önerisi
* **Tek ders için yoğunlaştırma:** [Süre dağılımı]
* **Daha kapsamlı uygulama:** [Genişletilmiş süre]

## Aligned Standards:
* [Girilen standart kodları ve açıklamaları. Eğer standart girilmediyse konuya uygun NGSS veya MEB kazanımları öner.]

Lütfen aşağıdaki verilere göre 5E modelinde detaylı bir ders planı hazırla:

- Sınıf Seviyesi (Grade level): ${request.sinifSeviyesi}
- Konu, Standart veya Hedef (Topic/Objective): ${request.konuKazanim}
- Ek Kriterler (Additional Customization): ${request.ekKriterler || 'Belirtilmedi'}
- Uyum Sağlanacak Standartlar (Standards Set to Align to): ${request.standartlar || 'Belirtilmedi'}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to generate 5E plan");
  }

  return text;
}

export interface UnitPlanRequest {
  sinifSeviyesi: string;
  uniteSuresi: string;
  uniteKonusu: string;
  baglam?: string;
  standartlar?: string;
}

export async function generateUnitPlan(request: UnitPlanRequest): Promise<string> {
  const prompt = `Sen uzman bir eğitimci ve müfredat tasarımcısısın. Görevin, öğretmenin sağladığı sınıf seviyesi, ünite süresi, konu, bağlam ve müfredat standartları doğrultusunda kapsamlı, uygulanabilir ve pedagojik açıdan güçlü bir "Ünite Planı" oluşturmaktır.

Aşağıdaki kurallara kesinlikle uymalısın:
1. Zaman Çizelgesi: Planı, öğretmenin belirttiği gün/ders saati sayısına göre gün gün (veya ders ders) böl.
2. Pedagoji: Etkileşimli öğrenme yöntemlerini (sorgulama temelli, proje tabanlı vb.) kullan.
3. Bağlam Uyumu: Öğretmen bir "Bağlam (Context)" verdiyse (örneğin; öğrencilerin ön bilgileri, sınav hazırlık grubu olmaları, özel ilgi alanları), etkinlikleri ve değerlendirmeleri mutlaka bu bağlama göre şekillendir.
4. Çıktı Formatı: Çıktıyı her zaman aşağıdaki Markdown şablonuna sadık kalarak, net ve okunabilir bir şekilde ver:

# [Ünite Adı] - Ünite Planı
**Sınıf Seviyesi:** [Sınıf] | **Süre:** [Süre]

## Ünite Özeti
[Ünitenin genel amacı ve öğrencilerin bu ünite sonunda ne öğreneceklerinin 2-3 cümlelik özeti.]

## Uyum Sağlanan Standartlar / Kazanımlar
* [Kazanım 1]
* [Kazanım 2]

## Günlük Ders Akışı
[Belirtilen gün sayısı kadar aşağıdaki yapıyı tekrarla]
### Gün 1: [Günün Konusu/Başlığı]
* **Öğrenme Hedefi:** Öğrenciler ... yapabilecektir.
* **Giriş / Dikkat Çekme (Engage):** [Kısa aktivite]
* **Ana Etkinlik / Öğretim (Explore/Explain):** [Öğretmenin ve öğrencinin rolü, bağlama uygun etkinlik]
* **Kapanış ve Değerlendirme (Evaluate):** [Öğrenmenin nasıl ölçüleceği]

## Ünite Sonu Değerlendirmesi
[Ünitenin tamamını kapsayan proje, test veya performans görevi önerisi.]

Lütfen aşağıdaki bilgilere dayanarak bir ünite planı oluştur:

- Sınıf Seviyesi (Grade Level): ${request.sinifSeviyesi}
- Ünite Süresi (Length of Unit): ${request.uniteSuresi}
- Ünite Konusu (Topic): ${request.uniteKonusu}
- Bağlam (Context): ${request.baglam || 'Belirtilmedi'}
- Standartlar (Standards Set to Align to): ${request.standartlar || 'Belirtilmedi'}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to generate unit plan");
  }

  return text;
}

export async function generateLessonPlan(request: LessonPlanRequest): Promise<LessonPlanResponse> {
  const prompt = `
Sen Türkiye Yüzyılı Maarif Modeli'ne uygun ders planı hazırlayan uzman bir eğitim tasarımcısısın.

Kurallar:
- Ders planı beceri temelli olmalı
- Öğrenci aktif olmalı
- Öğretmen rehber rolünde olmalı
- Süreç: giriş, gelişme, sonuç şeklinde olmalı
- Etkinlikler somut ve uygulanabilir olmalı
- Türkiye eğitim sistemine uygun olmalı
- Türkçe dilinde doğal ve öğretmen dostu yaz

Ek Kurallar:
${request.sinifSeviyesi === 'Düşük' ? '- Sınıf seviyesi düşük olduğu için daha basit ve anlaşılır etkinlikler üret.' : ''}
${request.sinifSeviyesi === 'İyi' ? '- Sınıf seviyesi iyi olduğu için daha zorlayıcı ve analitik etkinlikler üret.' : ''}
${request.dersTipi === 'Sınav Hazırlık' ? '- Sınav hazırlık seçildiği için test odaklı ve soru çözümü ağırlıklı etkinlikler ekle.' : ''}
${request.dersTipi === 'Tekrar' ? '- Tekrar dersi olduğu için önceki konularla bağlantı kuran ve pekiştirici etkinlikler ekle.' : ''}
${request.ogrenmeHedefi === 'Problem Çözme' ? '- Öğrenme hedefi problem çözme olduğu için senaryo tabanlı ve gerçek hayat problemlerine odaklan.' : ''}

Şu bilgilerle ders planı oluştur:
Ders: ${request.ders}
Sınıf: ${request.sinif}
Konu: ${request.konu}
Süre: ${request.sure}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dersBilgileri: {
            type: Type.OBJECT,
            properties: {
              ders: { type: Type.STRING },
              sinif: { type: Type.STRING },
              sure: { type: Type.STRING },
              temaUnite: { type: Type.STRING },
            },
            required: ["ders", "sinif", "sure", "temaUnite"],
          },
          kazanimlar: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "MEB uyumlu kazanımlar",
          },
          beceriler: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Eleştirel düşünme, Problem çözme, İletişim vb.",
          },
          degerler: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Sorumluluk, İş birliği vb.",
          },
          surecTasarimi: {
            type: Type.OBJECT,
            properties: {
              giris: {
                type: Type.OBJECT,
                properties: {
                  hook: { type: Type.STRING, description: "Merak uyandırıcı soru" },
                  gunlukHayat: { type: Type.STRING, description: "Günlük hayat bağlantısı" },
                },
                required: ["hook", "gunlukHayat"],
              },
              gelisme: {
                type: Type.OBJECT,
                properties: {
                  etkinlik1: { type: Type.STRING, description: "Grup çalışması vb." },
                  etkinlik2: { type: Type.STRING, description: "Problem çözme vb." },
                  etkinlik3: { type: Type.STRING, description: "Tartışma vb." },
                },
                required: ["etkinlik1", "etkinlik2", "etkinlik3"],
              },
              sonuc: {
                type: Type.OBJECT,
                properties: {
                  yansitmaSorusu: { type: Type.STRING },
                  transferGorevi: { type: Type.STRING },
                },
                required: ["yansitmaSorusu", "transferGorevi"],
              },
            },
            required: ["giris", "gelisme", "sonuc"],
          },
          olcmeDegerlendirme: {
            type: Type.OBJECT,
            properties: {
              gozlemFormu: { type: Type.STRING },
              cikisBileti: { type: Type.STRING },
              miniRubrik: { type: Type.STRING },
            },
            required: ["gozlemFormu", "cikisBileti", "miniRubrik"],
          },
        },
        required: ["dersBilgileri", "kazanimlar", "beceriler", "degerler", "surecTasarimi", "olcmeDegerlendirme"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to generate lesson plan");
  }

  return JSON.parse(text) as LessonPlanResponse;
}

export const generateRubric = async (request: RubricRequest): Promise<string> => {
  const prompt = `Sen uzman bir ölçme-değerlendirme uzmanı ve eğitim tasarımcısısın. Görevin, öğretmenin girdiği hedef, ödev açıklaması ve puan ölçeği doğrultusunda, öğrencilerin performansını objektif ve net bir şekilde değerlendirmeyi sağlayacak analitik bir "Dereceli Puanlama Anahtarı (Rubrik)" oluşturmaktır.

Aşağıdaki kurallara KESİNLİKLE uymalısın:
1. Puan Ölçeği (Point Scale): Öğretmenin belirttiği puan ölçeği sayısına göre sütun oluştur. (Örneğin "3" girildiyse: 3 Puan (Başarılı), 2 Puan (Geliştirilmeli), 1 Puan (Yetersiz) şeklinde 3 performans seviyesi belirle. "4" girildiyse 4 seviye belirle.)
2. Kriterler (Categories): Ödev açıklaması ve "Ek Özelleştirmeler" bölümünde istenen detayları baz alarak en az 4, en fazla 6 değerlendirme kriteri (satır) oluştur. (Eğer ek özelleştirmede özel bir kategori istenmişse, bunu kesinlikle tabloya ayrı bir satır olarak ekle.)
3. Hücre Açıklamaları: Tablodaki her bir hücreye, o puanı almak için öğrencinin ne yapması gerektiğini açık, gözlemlenebilir ve ölçülebilir davranış ifadeleriyle yaz.
4. Ekstra Alanlar: Tablonun en sağına öğretmenin puanı yazabilmesi için boş bir "Kazanılan Puan" sütunu ekle. Ayrıca en üste öğrenci/grup adı için bir boşluk ve en alta toplam puan için bir alan ekle.
5. Çıktı Formatı: Sonucu her zaman aşağıdaki Markdown tablosu şablonuna sadık kalarak ver.

ÇIKTI ŞABLONU:
# Ödev/Proje Değerlendirme Rubriği

**Öğrenci / Grup Adı:** _________________________________________
**Sınıf Seviyesi:** [Sınıf] | **Maksimum Puan:** [Ölçek x Kriter Sayısı]
**Hedef:** [Hedefin kısa özeti]

| Değerlendirme Kriteri | [Maksimum Puan] Puan (Mükemmel) | [Maksimum-1] Puan (Yeterli) | ... | 1 Puan (Geliştirilmeli) | **Kazanılan Puan** |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **[Kriter 1 Adı]** | [Net ve ölçülebilir açıklama] | [Açıklama] | [Açıklama] | [Açıklama] | |
| **[Kriter 2 Adı]** | [Açıklama] | [Açıklama] | [Açıklama] | [Açıklama] | |

**TOPLAM PUAN:** _______ / [Maksimum Puan]

---
*Not: Uyum sağlanan standartlar: [Varsa Standartlar]*

Lütfen aşağıdaki bilgilere dayanarak bir dereceli puanlama anahtarı (rubrik) oluştur:

- Sınıf Seviyesi (Grade level): ${request.sinifSeviyesi}
- Puan Ölçeği (Point Scale): ${request.puanOlcegi}
- Standart / Hedef (Standard / Objective): ${request.hedef}
- Ödev Açıklaması (Assignment Description): ${request.odevAciklamasi}
- Ek Özelleştirmeler (Additional Customization): ${request.ekKriterler || 'Belirtilmedi'}
- Uyum Sağlanacak Standartlar (Standards Set to Align to): ${request.standartlar || 'Belirtilmedi'}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export const generateWrittenExam = async (request: WrittenExamRequest): Promise<string> => {
  const kazanimlarText = request.kazanimlar.map((k, i) => `${i + 1}. ${k.kazanim} -> Soru Sayısı: ${k.soruSayisi}`).join('\n');

  const prompt = `Sen, Türkiye Yüzyılı Maarif Modeli'ne tam hakim, uzman bir ölçme-değerlendirme ve müfredat tasarımcısısın. Görevin, öğretmenin girdiği sınıf seviyesi, ders, kazanımlar ve soru sayılarına göre, öğrencilerin üst düzey düşünme becerilerini ölçecek "Yeni Nesil Açık Uçlu Yazılı Sınav Kağıdı" ve detaylı bir "Cevap Anahtarı/Rubrik" oluşturmaktır.

Aşağıdaki kurallara KESİNLİKLE uymalısın:
1. Şablon Yapısı: Çıktının en üstünde mutlaka sınav başlığı ile öğrenci bilgi alanı (Ad Soyad, No, Aldığı Puan) bulunmalıdır. Sınav kağıdının en altında ise öğretmenin adı soyadı yer almalıdır.
2. Maarif Modeli ve Beceri Örgüsü: Sorular kesinlikle basit bilgi hatırlama (ezber) sorusu olmamalıdır. Her soru; analiz etme, çıkarım yapma, verileri/grafikleri yorumlama veya problem çözme becerilerini ölçecek şekilde günlük yaşam bağlamına (gerçek hayat senaryolarına) oturtulmalıdır.
3. Kazanım-Soru Eşleşmesi: Öğretmenin belirttiği her kazanım için tam olarak istenen sayıda soru üret. Soruların başlığında o sorunun hangi kazanıma ait olduğunu kısa bir not olarak belirt.
4. Görsellerin Üretimi (Çok Önemli): Eğer soru bir tablo, grafik, modelleme veya basit bir deney düzeneği gerektiriyorsa, bunu kesinlikle harici bir link veya API olmadan, doğrudan SVG (Scalable Vector Graphics) kodu olarak oluştur. SVG kodunu bir kod bloğu içinde \`\`\`svg ... \`\`\` formatında ver. Görseller soru köküyle birebir uyumlu, temiz ve anlaşılır olmalıdır.
5. Öğrenci Cevap Alanı: Her sorunun altına öğrencilerin kendi cümleleriyle detaylı açıklama yazabilmesi için boşlukları temsil eden alt çizgiler (____) ekle.
6. Cevap Anahtarı ve Rubrik: Sınav kağıdının tamamen bittiğini gösteren kalın bir ayırıcı çizgi (=====) çek. Bu çizginin altına SADECE ÖĞRETMENİN KULLANIMI İÇİN her sorunun beklenen ideal cevabını ve objektif puanlama rubriğini yaz.

ÇIKTI ŞABLONU:
# [Sınav Başlığı]

**Öğrencinin Adı Soyadı:** _______________________   **Sınıfı/No:** _________   **Aldığı Puan:** _______

---

**Soru 1:** *(Kazanım: [Kazanım Özeti])*
[Günlük yaşam senaryosu veya bağlam açıklaması]

*(Eğer soru görsel gerektiriyorsa SVG kod bloğu)*
\`\`\`svg
[Yapay zekanın ürettiği SVG kodu]
\`\`\`

[Öğrencinin analiz veya çıkarım yapmasını isteyen açık uçlu yeni nesil soru kökü]

**Cevap:** ______________________________________________________________
______________________________________________________________
______________________________________________________________

*(Öğretmenin istediği tüm kazanımlar ve soru sayıları bitene kadar bu yapıyı tekrarla)*

---
**Ders Öğretmeni:** [Öğretmen Adı Soyadı]

====================================================================
# ÖĞRETMEN İÇİN CEVAP ANAHTARI VE DEĞERLENDİRME RUBRİĞİ
**(Bu bölüm öğrenciye verilecek çıktıya dahil edilmemelidir)**

**Soru 1 Çözümü ve Rubrik:**
* **Beklenen İdeal Cevap:** [Kapsamlı ve bilimsel açıklama]
* **Tam Puan Kriteri:** Öğrenci [şu kavramları] ve [şu çıkarımı] eksiksiz belirtmişse tam puan verilir.
* **Kısmi Puan Kriteri:** Öğrenci [şu detayı] atlamış ama [şu genel mantığı] kurabilmişse kısmi puan verilir.
* **0 Puan:** Yanlış bilgi, ilgisiz cevap veya ezberlenmiş ancak senaryoyla ilişkilendirilmemiş yanıt.

Lütfen aşağıdaki verilere göre Maarif Modeli'ne uygun, açık uçlu ve beceri temelli bir sınav kağıdı oluştur:

- Sınav Başlığı: ${request.sinavBasligi}
- Ders: ${request.ders}
- Sınıf Seviyesi: ${request.sinifSeviyesi}
- Öğretmen Adı Soyadı: ${request.ogretmenAdiSoyadi}

- Kazanımlar ve Soru Dağılımı:
${kazanimlarText}

- Ek Kriterler (Varsa): ${request.ekKriterler || 'Belirtilmedi'}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export const generateMultipleChoiceTest = async (request: MultipleChoiceTestRequest): Promise<string> => {
  const prompt = `Sen uzman bir ölçme-değerlendirme uzmanı ve eğitim müfredatı tasarımcısısın. Görevin, öğretmenin sağladığı sınıf seviyesi, soru sayısı, konu/metin ve standartlar doğrultusunda yüksek kaliteli, hatasız bir "Çoktan Seçmeli Test" oluşturmaktır.

Aşağıdaki kurallara KESİNLİKLE uymalısın:
1. Soru Sayısı: Sadece ve tam olarak öğretmenin belirttiği sayıda soru üret. Ne eksik ne fazla.
2. Seçenek Formatı: Sınıf seviyesi ortaokul (5-8) ise 4 seçenekli (A, B, C, D), lise (9-12) ise 5 seçenekli (A, B, C, D, E) sorular hazırla.
3. Çeldirici Kalitesi (Distractors): Yanlış seçenekler (çeldiriciler) rastgele olmamalıdır. Öğrencilerin sık yaptığı hatalara ve yaygın kavram yanılgılarına dayanmalıdır.
4. Soru Tarzı: Eğer konuda metin veya teşhis (diagnostic) vurgusu varsa, soruları doğrudan bilgi ezberinden ziyade okuduğunu anlama, mantık muhakeme ve çıkarım yapma (yeni nesil soru/LGS tarzı) odaklı kurgula.
5. Cevap Anahtarı: Testin en sonuna mutlaka ayrı bir bölüm olarak cevap anahtarını ve her sorunun neden doğru/yanlış olduğuna dair 1-2 cümlelik kısa çözümlerini ekle.
6. Şıkların Görünümü: Şıkları KESİNLİKLE yan yana yazma. Her şıkkı yeni bir satırda (alt alta) yaz. Markdown'da düzgün görünmesi için her şıkkın arasına bir satır boşluk bırak.

ÇIKTI ŞABLONU:
# [Konu/Başlık] - Çoktan Seçmeli Test
**Sınıf:** [Sınıf Seviyesi] | **Soru Sayısı:** [Soru Sayısı]
*(Varsa Uyumlu Standartlar: [Standartlar])*

---

**Soru 1:** [Soru Kökü]

A) [Seçenek]

B) [Seçenek]

C) [Seçenek]

D) [Seçenek]

*(Bu yapıyı istenen soru sayısı kadar tekrarla)*

---
## Cevap Anahtarı ve Çözümler
1. **[Doğru Seçenek]** - Çözüm: [Neden bu seçeneğin doğru, çeldiricilerin neden yanlış olduğuna dair çok kısa ve net açıklama.]
2. **[Doğru Seçenek]** - Çözüm: [...]

Lütfen aşağıdaki bilgilere dayanarak bir çoktan seçmeli test oluştur:

- Sınıf Seviyesi (Grade level): ${request.sinifSeviyesi}
- Soru Sayısı (Number of Questions): ${request.soruSayisi}
- Konu, Metin veya Değerlendirme Açıklaması (Topic/Description): ${request.konuAciklama}
- Uyum Sağlanacak Standartlar (Standards to Align): ${request.standartlar || 'Belirtilmedi'}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface DebateRequest {
  konu: string;
  sinifSeviyesi: string;
  format: string; // Münazara, Sokratik Seminer, Fikir Taraması vb.
  sure: string;
  ekIstekler?: string;
}

export const generateDebatePlan = async (request: DebateRequest): Promise<string> => {
  const ekDetay = request.ekIstekler ? `Ek İstekler: ${request.ekIstekler}` : '';
  const prompt = `Sen uzman bir eğitimci ve tartışma moderatörüsün. Sınıf içi tartışmaları ve münazaraları verimli, saygılı ve öğretici bir şekilde yönetmek için detaylı bir plan hazırlıyorsun.

Aşağıdaki bilgilere göre, öğrencilerin eleştirel düşünme, argüman üretme ve hitabet becerilerini geliştirecek bir tartışma/münazara tasarımı oluştur:

Konu/Tez: ${request.konu}
Sınıf Seviyesi: ${request.sinifSeviyesi}
Tartışma Formatı: ${request.format}
Ayrılan Süre: ${request.sure}
${ekDetay}

Lütfen çıktıyı aşağıdaki başlıkları KESİNLİKLE içerecek şekilde Markdown formatında hazırla:

# ${request.format} Planı: [Konunun İlgi Çekici Bir Başlığı]
**Sınıf:** ${request.sinifSeviyesi} | **Süre:** ${request.sure}

## 1. Tartışmanın Amacı ve Kuralları
[Öğrencilerin bu tartışmadan ne kazanacağı ve uyulması gereken temel iletişim/saygı kuralları]

## 2. Grupların Dağılımı ve Roller
[Sınıfın nasıl bölüneceği (Savunanlar, Karşı Çıkanlar, Jüri, Zaman Tutucu vb.) ve her rolün görev tanımı]

## 3. Örnek Argümanlar (Öğretmen İçin İpuçları)
### Savunulacak Argümanlar (Tez)
- [Örnek argüman 1]
- [Örnek argüman 2]

### Karşı Argümanlar (Antitez)
- [Örnek karşı argüman 1]
- [Örnek karşı argüman 2]

## 4. Süreç Akışı (Zaman Çizelgesi)
[Tartışmanın adım adım nasıl ilerleyeceği. Örn: 1. Grup Sunumu (5 dk), 2. Grup Sunumu (5 dk), Soru-Cevap (10 dk) vb.]

## 5. Jüri Değerlendirme Kriterleri (Mini Rubrik)
[Jürinin veya öğretmenin grupları değerlendirirken kullanacağı kriterler. Örn: Argümanların Gücü, Beden Dili, Süre Kullanımı, Karşı Tarafı Dinleme]

## 6. Kapanış ve Yansıtma
[Tartışma sonunda öğretmenin yapacağı toparlama konuşması ve öğrencilere sorulacak yansıtma soruları]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });

  return response.text || '';
};

export interface ImageRequest {
  konu: string;
  stil: string; // Çizgi film, Gerçekçi, Suluboya, 3D vb.
  ekIstekler?: string;
}

export const generateEducationalImage = async (request: ImageRequest): Promise<string> => {
  const ekDetay = request.ekIstekler ? `Ek detaylar: ${request.ekIstekler}` : '';
  const prompt = `Eğitim materyali için bir illüstrasyon: ${request.konu}. Stil: ${request.stil}. ${ekDetay}. Görsel, çocuklar ve öğrenciler için uygun, eğitici ve anlaşılır olmalıdır.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      return `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
    }
  }

  throw new Error("Görsel oluşturulamadı.");
};
