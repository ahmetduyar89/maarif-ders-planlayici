import React, { useState } from 'react';
import { BEPRequest } from '../services/geminiService';
import { HeartHandshake, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (request: BEPRequest) => void;
  isLoading: boolean;
}

export default function BEPForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<BEPRequest>({
    ogrenciYasi: '',
    yetersizlikTuru: '',
    ders: '',
    mevcutDurum: '',
    hedefler: '',
    ekTalimatlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Öğrenci Yaşı / Sınıfı</label>
          <input
            type="text"
            required
            placeholder="Örn: 3. Sınıf / 9 Yaş"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.ogrenciYasi}
            onChange={(e) => setFormData({ ...formData, ogrenciYasi: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Yetersizlik Türü / Tanı</label>
          <input
            type="text"
            required
            placeholder="Örn: Özgül Öğrenme Güçlüğü (Disleksi), Hafif Otizm"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.yetersizlikTuru}
            onChange={(e) => setFormData({ ...formData, yetersizlikTuru: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ders</label>
          <input
            type="text"
            required
            placeholder="Örn: Matematik, Türkçe, Hayat Bilgisi"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.ders}
            onChange={(e) => setFormData({ ...formData, ders: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Öğrencinin Mevcut Performans Düzeyi</label>
          <textarea
            required
            rows={3}
            placeholder="Öğrenci şu an neleri yapabiliyor? Hangi konularda zorlanıyor? (Örn: Toplama işlemini parmaklarıyla yapabiliyor ancak eldeli toplamada zorlanıyor.)"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.mevcutDurum}
            onChange={(e) => setFormData({ ...formData, mevcutDurum: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Genel Hedefler</label>
          <textarea
            required
            rows={3}
            placeholder="Bu ders için öğrencinin ulaşmasını istediğiniz temel hedefler nelerdir?"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.hedefler}
            onChange={(e) => setFormData({ ...formData, hedefler: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ek Talimatlar (İsteğe Bağlı)</label>
          <textarea
            rows={2}
            placeholder="Örn: Sınavlarda ek süre verilmesi gerekiyor, görsel materyaller ağırlıklı olsun..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.ekTalimatlar}
            onChange={(e) => setFormData({ ...formData, ekTalimatlar: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            BEP Hazırlanıyor...
          </>
        ) : (
          <>
            <HeartHandshake className="w-6 h-6" />
            BEP Taslağı Oluştur
          </>
        )}
      </button>
    </form>
  );
}
