import React, { useState } from 'react';
import { EventPlanRequest } from '../services/geminiService';
import { CalendarDays, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (request: EventPlanRequest) => void;
  isLoading: boolean;
}

export default function EventPlannerForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<EventPlanRequest>({
    etkinlikAdi: '',
    okulKademesi: '',
    katilimciSayisi: '',
    mekan: '',
    ekIstekler: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Etkinlik / Belirli Gün ve Hafta Adı</label>
          <input
            type="text"
            required
            placeholder="Örn: 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı, Yeşilay Haftası, Bilim Şenliği"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.etkinlikAdi}
            onChange={(e) => setFormData({ ...formData, etkinlikAdi: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Okul Kademesi</label>
          <select
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.okulKademesi}
            onChange={(e) => setFormData({ ...formData, okulKademesi: e.target.value })}
          >
            <option value="">Seçiniz...</option>
            <option value="Okul Öncesi">Okul Öncesi</option>
            <option value="İlkokul">İlkokul</option>
            <option value="Ortaokul">Ortaokul</option>
            <option value="Lise">Lise</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Etkinlik Mekanı</label>
          <select
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.mekan}
            onChange={(e) => setFormData({ ...formData, mekan: e.target.value })}
          >
            <option value="">Seçiniz...</option>
            <option value="Okul Bahçesi / Tören Alanı">Okul Bahçesi / Tören Alanı</option>
            <option value="Konferans Salonu">Konferans Salonu</option>
            <option value="Sınıf İçi">Sınıf İçi</option>
            <option value="Spor Salonu">Spor Salonu</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tahmini Katılımcı Sayısı</label>
          <input
            type="text"
            required
            placeholder="Örn: 50 Öğrenci, Tüm Okul (500 Kişi)"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.katilimciSayisi}
            onChange={(e) => setFormData({ ...formData, katilimciSayisi: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ek İstekler / Detaylar (İsteğe Bağlı)</label>
          <textarea
            rows={3}
            placeholder="Örn: Şiir okuma ağırlıklı olsun, koro performansı eklensin, veliler de katılacak..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.ekIstekler}
            onChange={(e) => setFormData({ ...formData, ekIstekler: e.target.value })}
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
            Plan Hazırlanıyor...
          </>
        ) : (
          <>
            <CalendarDays className="w-6 h-6" />
            Etkinlik Planı Oluştur
          </>
        )}
      </button>
    </form>
  );
}
