import React, { useState } from 'react';
import { MultipleChoiceTestRequest } from '../services/geminiService';
import { BookOpen, Target, FileText, Hash, Send } from 'lucide-react';

interface Props {
  onSubmit: (request: MultipleChoiceTestRequest) => void;
  isLoading: boolean;
}

export default function MultipleChoiceTestForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<MultipleChoiceTestRequest>({
    sinifSeviyesi: '',
    soruSayisi: 10,
    konuAciklama: '',
    standartlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-rose-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Çoktan Seçmeli Test Oluşturucu</h2>
        <p className="text-rose-100">
          Sınıf seviyesi ve konuya uygun, çeldiricileri özenle hazırlanmış yeni nesil testler oluşturun.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-4 h-4 text-rose-500" />
              Sınıf Seviyesi
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 8. Sınıf, 11. Sınıf"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.sinifSeviyesi}
              onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Hash className="w-4 h-4 text-rose-500" />
              Soru Sayısı
            </label>
            <input
              type="number"
              required
              min="1"
              max="50"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.soruSayisi}
              onChange={(e) => setFormData({ ...formData, soruSayisi: parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <FileText className="w-4 h-4 text-rose-500" />
            Konu, Metin veya Değerlendirme Açıklaması
          </label>
          <textarea
            required
            rows={4}
            placeholder="Örn: Hücre bölünmesi (Mitoz ve Mayoz), okuduğunu anlama metni, I. Dünya Savaşı nedenleri vb."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.konuAciklama}
            onChange={(e) => setFormData({ ...formData, konuAciklama: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Target className="w-4 h-4 text-rose-500" />
            Uyum Sağlanacak Standartlar (İsteğe Bağlı)
          </label>
          <input
            type="text"
            placeholder="Örn: MEB Kazanımları, LGS formatı, YKS vb."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.standartlar}
            onChange={(e) => setFormData({ ...formData, standartlar: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Test Oluştur
            </>
          )}
        </button>
      </form>
    </div>
  );
}
