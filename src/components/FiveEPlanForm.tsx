import React, { useState } from 'react';
import { BookOpen, Sparkles, Target, Settings, CheckCircle2, Loader2 } from 'lucide-react';
import { FiveEPlanRequest } from '../services/geminiService';

interface FiveEPlanFormProps {
  onSubmit: (request: FiveEPlanRequest) => void;
  isLoading: boolean;
}

export default function FiveEPlanForm({ onSubmit, isLoading }: FiveEPlanFormProps) {
  const [formData, setFormData] = useState<FiveEPlanRequest>({
    sinifSeviyesi: '',
    konuKazanim: '',
    ekKriterler: '',
    standartlar: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-8 md:p-10 space-y-8">
        {/* Sınıf Seviyesi */}
        <div className="space-y-3">
          <label htmlFor="sinifSeviyesi" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-4 h-4" />
            </div>
            Sınıf Seviyesi
          </label>
          <select
            id="sinifSeviyesi"
            name="sinifSeviyesi"
            required
            value={formData.sinifSeviyesi}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 dark:text-slate-300"
          >
            <option value="">Seçiniz</option>
            <option value="Okul Öncesi">Okul Öncesi</option>
            <option value="İlkokul 1. Sınıf">İlkokul 1. Sınıf</option>
            <option value="İlkokul 2. Sınıf">İlkokul 2. Sınıf</option>
            <option value="İlkokul 3. Sınıf">İlkokul 3. Sınıf</option>
            <option value="İlkokul 4. Sınıf">İlkokul 4. Sınıf</option>
            <option value="Ortaokul 5. Sınıf">Ortaokul 5. Sınıf</option>
            <option value="Ortaokul 6. Sınıf">Ortaokul 6. Sınıf</option>
            <option value="Ortaokul 7. Sınıf">Ortaokul 7. Sınıf</option>
            <option value="Ortaokul 8. Sınıf">Ortaokul 8. Sınıf</option>
            <option value="Lise 9. Sınıf">Lise 9. Sınıf</option>
            <option value="Lise 10. Sınıf">Lise 10. Sınıf</option>
            <option value="Lise 11. Sınıf">Lise 11. Sınıf</option>
            <option value="Lise 12. Sınıf">Lise 12. Sınıf</option>
          </select>
        </div>

        {/* Konu / Kazanım */}
        <div className="space-y-3">
          <label htmlFor="konuKazanim" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Target className="w-4 h-4" />
            </div>
            Konu veya Kazanım
          </label>
          <input
            type="text"
            id="konuKazanim"
            name="konuKazanim"
            required
            value={formData.konuKazanim}
            onChange={handleChange}
            placeholder="Örn: Hücrenin yapısı ve organeller"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 dark:text-slate-300"
          />
        </div>

        {/* Standartlar */}
        <div className="space-y-3">
          <label htmlFor="standartlar" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            Uyum Sağlanacak Standartlar (Opsiyonel)
          </label>
          <input
            type="text"
            id="standartlar"
            name="standartlar"
            value={formData.standartlar}
            onChange={handleChange}
            placeholder="Örn: MEB Fen Bilimleri Müfredatı, NGSS vb."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 dark:text-slate-300"
          />
        </div>

        {/* Ek Kriterler */}
        <div className="space-y-3">
          <label htmlFor="ekKriterler" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Settings className="w-4 h-4" />
            </div>
            Ek Kriterler (Opsiyonel)
          </label>
          <textarea
            id="ekKriterler"
            name="ekKriterler"
            value={formData.ekKriterler}
            onChange={handleChange}
            placeholder="Örn: STEM odaklı olsun, grup çalışması ağırlıklı olsun..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 dark:text-slate-300 resize-none"
          />
        </div>
      </div>

      <div className="bg-slate-50 p-8 border-t border-slate-200">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Plan Oluşturuluyor...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              5E Ders Planı Oluştur
            </>
          )}
        </button>
      </div>
    </form>
  );
}
