import React, { useState } from 'react';
import { StorytellingRequest } from '../services/geminiService';
import { Wand2, Loader2 } from 'lucide-react';

interface StorytellingFormProps {
  onSubmit: (request: StorytellingRequest) => void;
  isLoading: boolean;
}

export default function StorytellingForm({ onSubmit, isLoading }: StorytellingFormProps) {
  const [formData, setFormData] = useState<StorytellingRequest>({
    sinifSeviyesi: '',
    ders: '',
    konu: '',
    hikayeTuru: 'Macera',
    karakterler: '',
    ekTalimatlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
          <Wand2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hikayeleştirme (Storytelling) Aracı</h2>
          <p className="text-slate-500 text-sm mt-1">Soyut ve zor konuları öğrencilerin ilgisini çekecek eğlenceli hikayelere dönüştürün.</p>
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
              placeholder="Örn: 4. Sınıf, Lise 1 vb."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100"
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
              placeholder="Örn: Matematik, Tarih, Fen Bilimleri"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ders}
              onChange={(e) => setFormData({ ...formData, ders: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Konu (Soyut Kavram / Olay) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Örn: Kesirlerde Toplama, Fransız İhtilali, Fotosentez"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Hikaye Türü / Teması <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.hikayeTuru}
              onChange={(e) => setFormData({ ...formData, hikayeTuru: e.target.value })}
            >
              <option value="Macera">Macera</option>
              <option value="Bilim Kurgu">Bilim Kurgu</option>
              <option value="Gizem / Dedektiflik">Gizem / Dedektiflik</option>
              <option value="Masal / Fantastik">Masal / Fantastik</option>
              <option value="Günlük Yaşam">Günlük Yaşam</option>
              <option value="Tarihi Kurgu">Tarihi Kurgu</option>
              <option value="Komedi">Komedi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Ana Karakterler (İsteğe Bağlı)
            </label>
            <input
              type="text"
              placeholder="Örn: Ali ve Ayşe, Dedektif X, Uzaylı Zorg"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.karakterler}
              onChange={(e) => setFormData({ ...formData, karakterler: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Ek Talimatlar (İsteğe Bağlı)
          </label>
          <textarea
            placeholder="Örn: Hikaye ormanda geçsin, içinde bir bilmece olsun, çok uzun olmasın..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all min-h-[100px] text-slate-900 dark:text-slate-100"
            value={formData.ekTalimatlar}
            onChange={(e) => setFormData({ ...formData, ekTalimatlar: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Hikaye Yazılıyor...
          </>
        ) : (
          <>
            <Wand2 className="w-6 h-6" />
            Hikayeye Dönüştür
          </>
        )}
      </button>
    </form>
  );
}
