import React, { useState } from 'react';
import { RubricRequest } from '../services/geminiService';
import { BookOpen, Target, FileText, Hash, Send, Settings, Award } from 'lucide-react';

interface Props {
  onSubmit: (request: RubricRequest) => void;
  isLoading: boolean;
}

export default function RubricForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<RubricRequest>({
    sinifSeviyesi: '',
    puanOlcegi: 4,
    hedef: '',
    odevAciklamasi: '',
    ekKriterler: '',
    standartlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-amber-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Rubrik Oluşturucu</h2>
        <p className="text-amber-100">
          Öğrenci performansını objektif ve net bir şekilde değerlendirmek için analitik dereceli puanlama anahtarları hazırlayın.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-4 h-4 text-amber-500" />
              Sınıf Seviyesi
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 7. Sınıf, Lise 2"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.sinifSeviyesi}
              onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Hash className="w-4 h-4 text-amber-500" />
              Puan Ölçeği
            </label>
            <input
              type="number"
              required
              min="2"
              max="10"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.puanOlcegi}
              onChange={(e) => setFormData({ ...formData, puanOlcegi: parseInt(e.target.value) || 4 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Target className="w-4 h-4 text-amber-500" />
            Standart / Hedef
          </label>
          <input
            type="text"
            required
            placeholder="Örn: Öğrenciler bilimsel araştırma basamaklarını kullanarak bir deney tasarlar."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.hedef}
            onChange={(e) => setFormData({ ...formData, hedef: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <FileText className="w-4 h-4 text-amber-500" />
            Ödev / Proje Açıklaması
          </label>
          <textarea
            required
            rows={3}
            placeholder="Örn: Güneş sistemi maketi yapımı, münazara hazırlığı, dönem sonu kompozisyon ödevi vb."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.odevAciklamasi}
            onChange={(e) => setFormData({ ...formData, odevAciklamasi: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Settings className="w-4 h-4 text-amber-500" />
              Ek Özelleştirmeler (İsteğe Bağlı)
            </label>
            <input
              type="text"
              placeholder="Örn: Yaratıcılık kriteri eklensin, sunum becerisi de değerlendirilsin"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ekKriterler}
              onChange={(e) => setFormData({ ...formData, ekKriterler: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Award className="w-4 h-4 text-amber-500" />
              Uyum Sağlanacak Standartlar (İsteğe Bağlı)
            </label>
            <input
              type="text"
              placeholder="Örn: MEB Kazanımları, 21. Yüzyıl Becerileri"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.standartlar}
              onChange={(e) => setFormData({ ...formData, standartlar: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Rubrik Oluştur
            </>
          )}
        </button>
      </form>
    </div>
  );
}
