import React, { useState } from 'react';
import { Layers, Loader2 } from 'lucide-react';

export interface BatchRequest {
  ders: string;
  sinifSeviyesi: string;
  konu: string;
  materials: {
    lessonPlan: boolean;
    worksheet: boolean;
    quiz: boolean;
    game: boolean;
  };
}

interface Props {
  onSubmit: (request: BatchRequest) => void;
  isLoading: boolean;
}

export default function BatchGeneratorForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<BatchRequest>({
    ders: '',
    sinifSeviyesi: '',
    konu: '',
    materials: {
      lessonPlan: true,
      worksheet: true,
      quiz: true,
      game: false,
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCheckboxChange = (key: keyof BatchRequest['materials']) => {
    setFormData(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        [key]: !prev.materials[key]
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ders</label>
          <input
            type="text"
            required
            placeholder="Örn: Fen Bilimleri, Matematik"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.ders}
            onChange={(e) => setFormData({ ...formData, ders: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sınıf Seviyesi</label>
          <input
            type="text"
            required
            placeholder="Örn: 6. Sınıf, Lise 1"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.sinifSeviyesi}
            onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Konu / Kazanım</label>
          <textarea
            required
            rows={3}
            placeholder="Örn: Hücrenin yapısı ve organellerin görevleri"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Üretilecek Materyaller</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={formData.materials.lessonPlan}
                onChange={() => handleCheckboxChange('lessonPlan')}
                className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">Günlük Ders Planı</span>
            </label>
            <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={formData.materials.worksheet}
                onChange={() => handleCheckboxChange('worksheet')}
                className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">Çalışma Yaprağı</span>
            </label>
            <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={formData.materials.quiz}
                onChange={() => handleCheckboxChange('quiz')}
                className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">Çoktan Seçmeli Test (5 Soru)</span>
            </label>
            <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={formData.materials.game}
                onChange={() => handleCheckboxChange('game')}
                className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">Eğitici Oyun Fikri</span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !Object.values(formData.materials).some(Boolean)}
        className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Materyaller Üretiliyor (Bu işlem biraz sürebilir)...
          </>
        ) : (
          <>
            <Layers className="w-6 h-6" />
            Toplu Materyal Üret
          </>
        )}
      </button>
    </form>
  );
}
