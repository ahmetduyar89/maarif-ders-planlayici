import React, { useState } from 'react';
import { ParentMeetingRequest } from '../services/geminiService';
import { Users, Loader2 } from 'lucide-react';

interface ParentMeetingFormProps {
  onSubmit: (request: ParentMeetingRequest) => void;
  isLoading: boolean;
}

export default function ParentMeetingForm({ onSubmit, isLoading }: ParentMeetingFormProps) {
  const [formData, setFormData] = useState<ParentMeetingRequest>({
    gorusmeTuru: 'Genel Veli Toplantısı',
    sinifSeviyesi: '',
    ogrenciAdSoyad: '',
    gundemMaddeleri: '',
    gucluYonler: '',
    gelisimAlanlari: '',
    ekTalimatlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isIndividual = formData.gorusmeTuru === 'Bireysel Veli Görüşmesi';

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Veli Toplantısı ve Görüşme Raporu</h2>
          <p className="text-slate-500 text-sm mt-1">Genel toplantı gündemleri veya bireysel veli görüşmeleri için profesyonel raporlar hazırlayın.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Görüşme Türü <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.gorusmeTuru}
              onChange={(e) => setFormData({ ...formData, gorusmeTuru: e.target.value })}
            >
              <option value="Genel Veli Toplantısı">Genel Veli Toplantısı</option>
              <option value="Bireysel Veli Görüşmesi">Bireysel Veli Görüşmesi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Sınıf Seviyesi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 5/A, Lise 2 vb."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.sinifSeviyesi}
              onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
            />
          </div>
        </div>

        {isIndividual && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Öğrenci Adı Soyadı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required={isIndividual}
              placeholder="Örn: Ahmet Yılmaz"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ogrenciAdSoyad}
              onChange={(e) => setFormData({ ...formData, ogrenciAdSoyad: e.target.value })}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Gündem Maddeleri / Konuşulacaklar <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            placeholder={isIndividual ? "Örn: Akademik başarı, derse katılım, ödev alışkanlıkları..." : "Örn: Sınıf kuralları, sınav tarihleri, kılık kıyafet, geziler..."}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all min-h-[80px] text-slate-900 dark:text-slate-100"
            value={formData.gundemMaddeleri}
            onChange={(e) => setFormData({ ...formData, gundemMaddeleri: e.target.value })}
          />
        </div>

        {isIndividual && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Öğrencinin Güçlü Yönleri
              </label>
              <textarea
                placeholder="Örn: Saygılı, arkadaşlarıyla uyumlu, matematikte başarılı..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all min-h-[80px] text-slate-900 dark:text-slate-100"
                value={formData.gucluYonler}
                onChange={(e) => setFormData({ ...formData, gucluYonler: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Gelişim Alanları
              </label>
              <textarea
                placeholder="Örn: Derse daha çok katılmalı, ödevlerini zamanında yapmalı..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all min-h-[80px] text-slate-900 dark:text-slate-100"
                value={formData.gelisimAlanlari}
                onChange={(e) => setFormData({ ...formData, gelisimAlanlari: e.target.value })}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Ek Notlar (İsteğe Bağlı)
          </label>
          <textarea
            placeholder="Örn: Veliden özel olarak istenen bir şey, toplantı kuralları..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all min-h-[80px] text-slate-900 dark:text-slate-100"
            value={formData.ekTalimatlar}
            onChange={(e) => setFormData({ ...formData, ekTalimatlar: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Rapor Hazırlanıyor...
          </>
        ) : (
          <>
            <Users className="w-6 h-6" />
            Rapor / Gündem Oluştur
          </>
        )}
      </button>
    </form>
  );
}
