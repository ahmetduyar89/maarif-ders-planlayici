import React, { useState } from 'react';
import { ProjectTaskRequest } from '../services/geminiService';
import { ClipboardList, Loader2 } from 'lucide-react';

interface ProjectTaskFormProps {
  onSubmit: (request: ProjectTaskRequest) => void;
  isLoading: boolean;
}

export default function ProjectTaskForm({ onSubmit, isLoading }: ProjectTaskFormProps) {
  const [formData, setFormData] = useState<ProjectTaskRequest>({
    sinifSeviyesi: '',
    ders: '',
    konu: '',
    odevTuru: 'Proje Ödevi',
    sure: '',
    ogrenciCalismaSekli: 'Bireysel',
    ekTalimatlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Proje ve Performans Ödevi Tasarımcısı</h2>
          <p className="text-slate-500 text-sm mt-1">Öğrenciler için yönergeleri net, beceri geliştiren ödev taslakları hazırlayın.</p>
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
              placeholder="Örn: 7. Sınıf, Lise 3 vb."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100"
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
              placeholder="Örn: Sosyal Bilgiler, Fizik"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ders}
              onChange={(e) => setFormData({ ...formData, ders: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Konu / Kazanım <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Örn: Küresel Isınmanın Etkileri, Newton'un Hareket Yasaları"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Ödev Türü <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.odevTuru}
              onChange={(e) => setFormData({ ...formData, odevTuru: e.target.value })}
            >
              <option value="Proje Ödevi">Proje Ödevi</option>
              <option value="Performans Ödevi">Performans Ödevi</option>
              <option value="Araştırma Ödevi">Araştırma Ödevi</option>
              <option value="Dönem Ödevi">Dönem Ödevi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Verilen Süre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 2 Hafta, 1 Ay"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.sure}
              onChange={(e) => setFormData({ ...formData, sure: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Çalışma Şekli <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ogrenciCalismaSekli}
              onChange={(e) => setFormData({ ...formData, ogrenciCalismaSekli: e.target.value })}
            >
              <option value="Bireysel">Bireysel</option>
              <option value="Grup Çalışması (2-3 Kişi)">Grup Çalışması (2-3 Kişi)</option>
              <option value="Grup Çalışması (4-5 Kişi)">Grup Çalışması (4-5 Kişi)</option>
              <option value="Fark Etmez">Fark Etmez</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Ek Talimatlar (İsteğe Bağlı)
          </label>
          <textarea
            placeholder="Örn: Öğrenciler mutlaka bir maket yapsın, sunumda dijital araçlar kullanılsın..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] text-slate-900 dark:text-slate-100"
            value={formData.ekTalimatlar}
            onChange={(e) => setFormData({ ...formData, ekTalimatlar: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Ödev Taslağı Oluşturuluyor...
          </>
        ) : (
          <>
            <ClipboardList className="w-6 h-6" />
            Ödev Taslağı Oluştur
          </>
        )}
      </button>
    </form>
  );
}
