import React, { useState } from 'react';
import { DebateRequest } from '../services/geminiService';
import { Split, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (request: DebateRequest) => void;
  isLoading: boolean;
}

export default function DebateForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<DebateRequest>({
    konu: '',
    sinifSeviyesi: '',
    format: '',
    sure: '',
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
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tartışma Konusu / Tez</label>
          <input
            type="text"
            required
            placeholder="Örn: Teknoloji insanları yalnızlaştırır mı? / Sosyal medyanın yaş sınırı olmalı mıdır?"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sınıf Seviyesi</label>
          <input
            type="text"
            required
            placeholder="Örn: 8. Sınıf, Lise 2"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.sinifSeviyesi}
            onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tartışma Formatı</label>
          <select
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value })}
          >
            <option value="">Seçiniz...</option>
            <option value="Klasik Münazara">Klasik Münazara (Tez vs Antitez)</option>
            <option value="Sokratik Seminer">Sokratik Seminer (Metin/Soru Odaklı)</option>
            <option value="Panel">Panel Tartışması (Uzman Rolleri)</option>
            <option value="Fikir Taraması">Fikir Taraması (Beyin Fırtınası)</option>
            <option value="Serbest Tartışma">Serbest Sınıf İçi Tartışma</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ayrılan Süre</label>
          <input
            type="text"
            required
            placeholder="Örn: 40 Dakika, 2 Ders Saati"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.sure}
            onChange={(e) => setFormData({ ...formData, sure: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ek İstekler / Detaylar (İsteğe Bağlı)</label>
          <textarea
            rows={3}
            placeholder="Örn: Jüri değerlendirme rubriği detaylı olsun, öğrencilere araştırmaları için kaynak önerileri de eklensin..."
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
            <Split className="w-6 h-6" />
            Tartışma Planı Oluştur
          </>
        )}
      </button>
    </form>
  );
}
