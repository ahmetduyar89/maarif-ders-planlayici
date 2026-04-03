import React, { useState } from 'react';
import { DifferentiatedInstructionRequest } from '../services/geminiService';
import { Split, Loader2 } from 'lucide-react';

interface DifferentiatedInstructionFormProps {
  onSubmit: (request: DifferentiatedInstructionRequest) => void;
  isLoading: boolean;
}

export default function DifferentiatedInstructionForm({ onSubmit, isLoading }: DifferentiatedInstructionFormProps) {
  const [formData, setFormData] = useState<DifferentiatedInstructionRequest>({
    sinifSeviyesi: '',
    ders: '',
    konu: '',
    kazanimlar: '',
    ekTalimatlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="bg-teal-100 p-3 rounded-xl text-teal-600">
          <Split className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Farklılaştırılmış Öğretim Aracı</h2>
          <p className="text-slate-500 text-sm mt-1">Farklı öğrenme hızlarına sahip öğrenciler için 3 seviyeli etkinlikler tasarlayın.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Sınıf Seviyesi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 3. Sınıf, 8. Sınıf vb."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.sinifSeviyesi}
              onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Ders <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Fen Bilimleri, Matematik"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ders}
              onChange={(e) => setFormData({ ...formData, ders: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Konu <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Örn: Madde ve Doğası, Kesirler"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Kazanımlar <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            placeholder="Örn: Maddenin hallerini açıklar ve örnekler verir."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all min-h-[100px] text-slate-900 dark:text-slate-100"
            value={formData.kazanimlar}
            onChange={(e) => setFormData({ ...formData, kazanimlar: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Ek Talimatlar (İsteğe Bağlı)
          </label>
          <textarea
            placeholder="Örn: İleri düzey öğrenciler için teknoloji kullanımı içersin, destek bekleyenler için oyunlaştırma kullanılsın..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all min-h-[100px] text-slate-900 dark:text-slate-100"
            value={formData.ekTalimatlar}
            onChange={(e) => setFormData({ ...formData, ekTalimatlar: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Etkinlikler Hazırlanıyor...
          </>
        ) : (
          <>
            <Split className="w-6 h-6" />
            Farklılaştırılmış Etkinlik Üret
          </>
        )}
      </button>
    </form>
  );
}
