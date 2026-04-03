import React, { useState } from 'react';
import { GameIdeaRequest } from '../services/geminiService';
import { Gamepad2, Loader2 } from 'lucide-react';

interface GameIdeaFormProps {
  onSubmit: (request: GameIdeaRequest) => void;
  isLoading: boolean;
}

export default function GameIdeaForm({ onSubmit, isLoading }: GameIdeaFormProps) {
  const [formData, setFormData] = useState<GameIdeaRequest>({
    sinifSeviyesi: '',
    ders: '',
    konu: '',
    mekan: 'Sınıf İçi',
    materyalDurumu: 'Basit Materyallerle',
    ogrenciSayisi: '',
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
          <Gamepad2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Eğitici Oyun ve Etkinlik Fikirleri</h2>
          <p className="text-slate-500 text-sm mt-1">Konuyu pekiştiren, eğlenceli ve uygulanabilir oyun senaryoları tasarlayın.</p>
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
              placeholder="Örn: 3. Sınıf, Lise 1 vb."
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
              placeholder="Örn: Matematik, Hayat Bilgisi"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
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
            placeholder="Örn: Çarpım Tablosu, Yönler"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Oyun Mekanı <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.mekan}
              onChange={(e) => setFormData({ ...formData, mekan: e.target.value })}
            >
              <option value="Sınıf İçi">Sınıf İçi</option>
              <option value="Bahçe / Açık Alan">Bahçe / Açık Alan</option>
              <option value="Spor Salonu">Spor Salonu</option>
              <option value="Fark Etmez">Fark Etmez</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Materyal Durumu <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.materyalDurumu}
              onChange={(e) => setFormData({ ...formData, materyalDurumu: e.target.value })}
            >
              <option value="Materyalsiz">Materyalsiz (Sadece öğrenciler)</option>
              <option value="Basit Materyallerle">Basit Materyallerle (Kağıt, kalem, top vb.)</option>
              <option value="Fark Etmez">Fark Etmez</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Öğrenci Sayısı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 25, 30"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ogrenciSayisi}
              onChange={(e) => setFormData({ ...formData, ogrenciSayisi: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Ek Talimatlar (İsteğe Bağlı)
          </label>
          <textarea
            placeholder="Örn: Öğrenciler çok hareketli, enerjilerini atacakları bir oyun olsun..."
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
            Oyun Fikirleri Üretiliyor...
          </>
        ) : (
          <>
            <Gamepad2 className="w-6 h-6" />
            Oyun Fikirleri Üret
          </>
        )}
      </button>
    </form>
  );
}
