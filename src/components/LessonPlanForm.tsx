import React, { useState } from 'react';
import { LessonPlanRequest } from '../services/geminiService';
import { BookOpen, Clock, Target, Users, GraduationCap, Lightbulb, Activity } from 'lucide-react';

interface LessonPlanFormProps {
  onSubmit: (request: LessonPlanRequest) => void;
  isLoading: boolean;
}

export default function LessonPlanForm({ onSubmit, isLoading }: LessonPlanFormProps) {
  const [formData, setFormData] = useState<LessonPlanRequest>({
    ders: '',
    sinif: '',
    konu: '',
    sure: '40 dk',
    sinifSeviyesi: 'Orta',
    dersTipi: 'Yeni Konu',
    ogrenmeHedefi: 'Kavramsal',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Zorunlu Alanlar
          </h3>
          <p className="text-sm text-slate-500 mt-1">Ders planının temel yapı taşlarını belirleyin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="ders" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Ders <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                id="ders"
                name="ders"
                required
                placeholder="Örn: Matematik, Türkçe"
                value={formData.ders}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="sinif" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Sınıf <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                id="sinif"
                name="sinif"
                required
                placeholder="Örn: 5. Sınıf"
                value={formData.sinif}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="konu" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Konu / Kazanım <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <GraduationCap className="h-4 w-4 text-slate-400" />
              </div>
              <textarea
                id="konu"
                name="konu"
                required
                rows={2}
                placeholder="Örn: Kesirlerle toplama ve çıkarma işlemlerini yapar."
                value={formData.konu}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="sure" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Süre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-4 w-4 text-slate-400" />
              </div>
              <select
                id="sure"
                name="sure"
                required
                value={formData.sure}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="40 dk">40 dk (1 Ders Saati)</option>
                <option value="80 dk">80 dk (2 Ders Saati)</option>
                <option value="120 dk">120 dk (3 Ders Saati)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Opsiyonel Ayarlar
          </h3>
          <p className="text-sm text-slate-500 mt-1">Ders planını sınıfınızın ihtiyaçlarına göre özelleştirin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="sinifSeviyesi" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Sınıf Seviyesi
            </label>
            <select
              id="sinifSeviyesi"
              name="sinifSeviyesi"
              value={formData.sinifSeviyesi}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="Düşük">Düşük (Destek İhtiyacı)</option>
              <option value="Orta">Orta (Standart)</option>
              <option value="İyi">İyi (İleri Düzey)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="dersTipi" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Ders Tipi
            </label>
            <select
              id="dersTipi"
              name="dersTipi"
              value={formData.dersTipi}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="Yeni Konu">Yeni Konu Öğretimi</option>
              <option value="Tekrar">Konu Tekrarı</option>
              <option value="Sınav Hazırlık">Sınav Hazırlık</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="ogrenmeHedefi" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Öğrenme Hedefi
            </label>
            <select
              id="ogrenmeHedefi"
              name="ogrenmeHedefi"
              value={formData.ogrenmeHedefi}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="Kavramsal">Kavramsal Anlama</option>
              <option value="Problem Çözme">Problem Çözme</option>
              <option value="Beceri Geliştirme">Beceri Geliştirme</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <Activity className="w-5 h-5 animate-spin" />
              Plan Oluşturuluyor...
            </>
          ) : (
            <>
              <Lightbulb className="w-5 h-5" />
              Maarif Modeli Ders Planı Üret
            </>
          )}
        </button>
      </div>
    </form>
  );
}
