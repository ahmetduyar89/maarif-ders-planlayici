import React, { useState } from 'react';
import { Layers, Calendar, BookOpen, Target, FileText, Loader2 } from 'lucide-react';
import { UnitPlanRequest } from '../services/geminiService';

interface UnitPlanFormProps {
  onSubmit: (request: UnitPlanRequest) => void;
  isLoading: boolean;
}

export default function UnitPlanForm({ onSubmit, isLoading }: UnitPlanFormProps) {
  const [formData, setFormData] = useState<UnitPlanRequest>({
    sinifSeviyesi: '',
    uniteSuresi: '',
    uniteKonusu: '',
    baglam: '',
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-emerald-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-8 h-8 opacity-90" />
          <h2 className="text-2xl font-bold">Ünite Planlayıcı</h2>
        </div>
        <p className="text-emerald-100">Geniş kapsamlı, gün gün bölünmüş, pedagojik hedeflere uygun ünite planları tasarlayın.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sınıf Seviyesi */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Target className="w-4 h-4 text-emerald-500" />
              Sınıf Seviyesi <span className="text-red-500">*</span>
            </label>
            <select
              name="sinifSeviyesi"
              required
              value={formData.sinifSeviyesi}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-slate-900 dark:text-slate-100"
            >
              <option value="">Seçiniz...</option>
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

          {/* Ünite Süresi */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Ünite Süresi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="uniteSuresi"
              required
              placeholder="Örn: 2 Hafta, 10 Ders Saati, 5 Gün"
              value={formData.uniteSuresi}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Ünite Konusu */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Ünite Konusu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="uniteKonusu"
              required
              placeholder="Örn: Hücre Bölünmeleri, İkinci Dünya Savaşı, Kesirler"
              value={formData.uniteKonusu}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Bağlam */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <FileText className="w-4 h-4 text-emerald-500" />
              Bağlam (Opsiyonel)
            </label>
            <textarea
              name="baglam"
              rows={3}
              placeholder="Örn: Öğrencilerin ön bilgileri zayıf, LGS hazırlık grubu, proje tabanlı öğrenmeye yatkınlar vb."
              value={formData.baglam}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Standartlar */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Target className="w-4 h-4 text-emerald-500" />
              Standartlar / Kazanımlar (Opsiyonel)
            </label>
            <textarea
              name="standartlar"
              rows={3}
              placeholder="Örn: MEB kazanımları, IB standartları veya özel hedefleriniz..."
              value={formData.standartlar}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Ünite Planı Hazırlanıyor...
            </>
          ) : (
            <>
              <Layers className="w-6 h-6" />
              Ünite Planı Oluştur
            </>
          )}
        </button>
      </form>
    </div>
  );
}
